import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { useSetRecruitApplication } from '~/services/recruit';
import { rejectRecruitApplication } from '~/services/recruit/apis';

export const useRejectRecruitApplication = (recruitId: number) => {
  const queryClient = useQueryClient();
  const setRecruitApplication = useSetRecruitApplication(recruitId);

  return useMutation({
    mutationFn: rejectRecruitApplication,
    onSuccess: ({ matchStatus }, recruitApplicationId) => {
      // invalidate: 신청자 목록, 거절한 신청자 목록
      queryClient.invalidateQueries(
        queryKeys.recruit.application.applicants(recruitId)
      );
      setRecruitApplication(recruitApplicationId, (prevRecruitApplication) => {
        if (!prevRecruitApplication) return;
        return { ...prevRecruitApplication, matchStatus };
      });
    },
  });
};
