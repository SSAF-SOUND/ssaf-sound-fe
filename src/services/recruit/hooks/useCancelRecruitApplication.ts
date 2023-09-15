import type { RecruitApplicationParams } from './types';
import type { MyRecruitApplicationDetail } from '~/services/recruit/apis';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { cancelRecruitApplication } from '~/services/recruit/apis';

export const useCancelRecruitApplication = (
  params: RecruitApplicationParams
) => {
  const { recruitId, recruitApplicationId } = params;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cancelRecruitApplication(recruitApplicationId),
    onSuccess: ({ matchStatus }) => {
      queryClient.setQueryData<MyRecruitApplicationDetail>(
        queryKeys.recruit.application.mine(recruitId),
        (prev) => {
          if (!prev) return;
          return { ...prev, matchStatus };
        }
      );
    },
  });
};
