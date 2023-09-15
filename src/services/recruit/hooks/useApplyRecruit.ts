import type { ApplyRecruitParams ,
  MyRecruitApplicationDetail} from '~/services/recruit/apis';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import {
  applyRecruit
} from '~/services/recruit/apis';

export const useApplyRecruit = (recruitId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ApplyRecruitParams) => applyRecruit(recruitId, params),
    onSuccess: ({ matchStatus }) => {
      // invalidate: 디테일, 신청서, TODO: 신청한 리쿠르팅 목록
      queryClient.invalidateQueries(queryKeys.recruit.detail(recruitId), {
        exact: true,
      });
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
