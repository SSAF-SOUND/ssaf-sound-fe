import type {
  GetRecruitApplicantsApiData,
  RecruitApplicant,
  RecruitApplicationParams,
  RecruitParts,
} from '~/services/recruit';

import { useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';

import { queryKeys } from '~/react-query/common';

export const useSetRecruitApplicantsWithImmer = (
  params: Omit<RecruitApplicationParams, 'recruitApplicationId'>
) => {
  const { recruitId } = params;
  const queryClient = useQueryClient();

  const setRecruitApplicantsWithImmer = (
    recipe: (
      recruitApplications: Partial<Record<RecruitParts, RecruitApplicant[]>>
    ) => void
  ) => {
    const queryKey = queryKeys.recruit.application.applicants(recruitId);

    queryClient.setQueryData<GetRecruitApplicantsApiData['data']>(
      queryKey,
      (prevRecruitApplications) => {
        if (!prevRecruitApplications) return;

        const nextRecruitApplications = produce(
          prevRecruitApplications,
          (draft) => {
            if (!draft?.recruitApplications) return;
            recipe(draft.recruitApplications);
          }
        );

        return nextRecruitApplications;
      }
    );
  };

  return setRecruitApplicantsWithImmer;
};
