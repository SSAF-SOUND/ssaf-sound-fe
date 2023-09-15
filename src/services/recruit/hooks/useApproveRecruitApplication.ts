import type { RecruitApplicationParams } from './types';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { useSetRecruitApplication } from '~/services/recruit';
import { approveRecruitApplication } from '~/services/recruit/apis';

export const useApproveRecruitApplication = (
  params: RecruitApplicationParams
) => {
  const { recruitId, recruitApplicationId } = params;
  const queryClient = useQueryClient();
  const setRecruitApplication = useSetRecruitApplication(params);

  return useMutation({
    mutationFn: () => approveRecruitApplication(recruitApplicationId),
    onSuccess: ({ matchStatus }) => {
      // invalidate: 디테일, 참여자 목록, 신청자 목록
      queryClient.invalidateQueries(queryKeys.recruit.detail(recruitId), {
        exact: true,
      });
      queryClient.invalidateQueries(
        queryKeys.recruit.application.applicants(recruitId)
      );
      queryClient.invalidateQueries(queryKeys.recruit.participants(recruitId));

      setRecruitApplication((prevRecruitApplication) => {
        if (!prevRecruitApplication) return;
        return { ...prevRecruitApplication, matchStatus };
      });
    },
  });
};
