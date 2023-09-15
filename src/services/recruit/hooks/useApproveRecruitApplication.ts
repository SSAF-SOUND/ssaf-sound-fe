import type { RecruitApplicationParams } from './types';
import type { MyRecruitApplicationDetail } from '~/services/recruit/apis';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { approveRecruitApplication } from '~/services/recruit/apis';

export const useApproveRecruitApplication = (
  params: RecruitApplicationParams
) => {
  const { recruitId, recruitApplicationId } = params;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => approveRecruitApplication(recruitApplicationId),
    onSuccess: ({ matchStatus }) => {
      queryClient.invalidateQueries(queryKeys.recruit.detail(recruitId));
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
