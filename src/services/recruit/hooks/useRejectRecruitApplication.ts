import type { RecruitApplicationParams } from './types';
import type { MyRecruitApplicationDetail } from '~/services/recruit/apis';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { rejectRecruitApplication } from '~/services/recruit/apis';

export const useRejectRecruitApplication = (
  params: RecruitApplicationParams
) => {
  const { recruitId, recruitApplicationId } = params;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => rejectRecruitApplication(recruitApplicationId),
    onSuccess: ({ matchStatus }) => {
      queryClient.setQueryData<MyRecruitApplicationDetail>(
        queryKeys.recruit.application.detail({
          recruitId,
          recruitApplicationId,
        }),
        (prev) => {
          if (!prev) return;
          return { ...prev, matchStatus };
        }
      );
    },
  });
};
