import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { approveRecruitApplication } from '~/services/recruit/apis';
import { useSetRecruitApplication } from '~/services/recruit/hooks';

export const useApproveRecruitApplication = (recruitId: number) => {
  const queryClient = useQueryClient();
  const setRecruitApplication = useSetRecruitApplication(recruitId);

  return useMutation({
    mutationFn: approveRecruitApplication,
    onSuccess: ({ matchStatus }, recruitApplicationId) => {
      // invalidate: 디테일, 참여자 목록, 신청자 목록
      queryClient.invalidateQueries(queryKeys.recruit.detail(recruitId), {
        exact: true,
      });
      queryClient.invalidateQueries(
        queryKeys.recruit.application.applicants(recruitId)
      );
      queryClient.invalidateQueries(queryKeys.recruit.participants(recruitId));

      setRecruitApplication(recruitApplicationId, (prevRecruitApplication) => {
        if (!prevRecruitApplication) return;
        return { ...prevRecruitApplication, matchStatus };
      });
    },
  });
};
