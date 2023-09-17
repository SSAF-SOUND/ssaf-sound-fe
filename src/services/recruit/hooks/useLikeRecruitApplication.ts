import type { RecruitApplicant } from '~/services/recruit/apis';
import type { RecruitApplicationParams } from '~/services/recruit/hooks';
import type { RecruitParts } from '~/services/recruit/utils';

import * as Sentry from '@sentry/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { likeRecruitApplication } from '~/services/recruit/apis';
import {
  useSetRecruitApplicantsWithImmer,
  useSetRecruitApplication,
} from '~/services/recruit/hooks';
import { concat, getErrorResponse, ResponseCode } from '~/utils';

interface UseLikeRecruitApplicationParams extends RecruitApplicationParams {
  recruitPart?: RecruitParts;
}

export const useLikeRecruitApplication = (
  params: UseLikeRecruitApplicationParams
) => {
  const { recruitApplicationId, recruitId, recruitPart } = params;

  const queryClient = useQueryClient();

  const setRecruitApplication = useSetRecruitApplication(recruitId);
  const setRecruitApplicantsWithImmer =
    useSetRecruitApplicantsWithImmer(params);

  const setRecruitApplicant = (
    recipe: (recruitApplicant: RecruitApplicant) => void
  ) => {
    setRecruitApplicantsWithImmer((recruitApplications) => {
      const target = recruitPart
        ? recruitApplications[recruitPart]?.find(
            (application) =>
              application.recruitApplicationId === recruitApplicationId
          )
        : Object.entries(recruitApplications)
            .map(([, applications]) => {
              return applications;
            })
            .reduce(concat)
            .find((application) => {
              return application.recruitApplicationId === recruitApplicationId;
            });

      if (!target) {
        const errorMessage =
          recruitApplications[recruitPart as RecruitParts] === undefined
            ? '잘못된 recruit part가 전달되었습니다.'
            : '잘못된 recruitApplicationId가 전달되었습니다.';
        Sentry.captureException(
          new Error(
            `[In useLikeRecruitApplication] ${errorMessage} ${recruitApplications}\n recruitApplicationId: ${recruitApplicationId}\n recruitPart: ${recruitPart} `
          )
        );
        return;
      }

      recipe(target);
    });
  };

  return useMutation({
    mutationFn: () => likeRecruitApplication(recruitApplicationId),
    onSuccess: (latestLiked) => {
      setRecruitApplicant((recruitApplicant) => {
        recruitApplicant.liked = latestLiked;
      });
      setRecruitApplication(recruitApplicationId, (recruitApplication) => {
        if (!recruitApplication) return;
        return {
          ...recruitApplication,
          liked: latestLiked,
        };
      });
    },
    onError: (err) => {
      const errorResponse = getErrorResponse(err);
      const errorCode = errorResponse?.code;
      if (errorCode === ResponseCode.APPLICATION_CANCELED) {
        const applicantsQueryKey =
          queryKeys.recruit.application.applicants(recruitId);
        queryClient.invalidateQueries(applicantsQueryKey);
      } else {
        setRecruitApplicant((recruitApplicant) => {
          recruitApplicant.liked = !recruitApplicant.liked;
        });
        setRecruitApplication(recruitApplicationId, (recruitApplication) => {
          if (!recruitApplication) return;
          return { ...recruitApplication, liked: !recruitApplication.liked };
        });
      }
    },
  });
};
