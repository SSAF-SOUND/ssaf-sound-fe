import type { RecruitApplicationParams } from './types';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { useSetRecruitApplication } from '~/services/recruit';
import { rejectRecruitApplication } from '~/services/recruit/apis';

export const useRejectRecruitApplication = (
  params: RecruitApplicationParams
) => {
  const { recruitId, recruitApplicationId } = params;
  const queryClient = useQueryClient();
  const setRecruitApplication = useSetRecruitApplication(params);

  return useMutation({
    mutationFn: () => rejectRecruitApplication(recruitApplicationId),
    onSuccess: ({ matchStatus }) => {
      // invalidate: 신청자 목록, 거절한 신청자 목록
      queryClient.invalidateQueries(
        queryKeys.recruit.application.applicants(recruitId)
      );
      setRecruitApplication((prevRecruitApplication) => {
        if (!prevRecruitApplication) return;
        return { ...prevRecruitApplication, matchStatus };
      });
    },
  });
};
