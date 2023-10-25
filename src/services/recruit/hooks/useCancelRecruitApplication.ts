import type { RecruitApplicationParams } from './types';
import type { MyRecruitApplicationDetail } from '~/services/recruit/apis';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { cancelRecruitApplication } from '~/services/recruit/apis';

// 신청한 리쿠르팅 목록
export const useCancelRecruitApplication = (
  params: RecruitApplicationParams
) => {
  const { recruitId, recruitApplicationId } = params;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cancelRecruitApplication(recruitApplicationId),
    onSuccess: ({ matchStatus }) => {
      // invalidate: 디테일, 내 신청서, 신청한 리쿠르팅 목록
      queryClient.invalidateQueries(queryKeys.recruit.detail(recruitId), {
        exact: true,
      });
      queryClient.invalidateQueries(queryKeys.recruit.appliedListBase());
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
