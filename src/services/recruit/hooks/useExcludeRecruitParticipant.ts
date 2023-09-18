import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { rejectRecruitApplication } from '~/services/recruit/apis';

export const useExcludeRecruitParticipant = (recruitId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectRecruitApplication,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.recruit.detail(recruitId), {
        exact: true,
      });
      queryClient.invalidateQueries(queryKeys.recruit.participants(recruitId), {
        exact: true,
      });
    },
  });
};
