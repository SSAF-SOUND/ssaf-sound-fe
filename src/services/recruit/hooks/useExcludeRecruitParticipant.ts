import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { excludeRecruitParticipant } from '~/services/recruit';

export const useExcludeRecruitParticipant = (recruitId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (recruitApplicationId: number) =>
      excludeRecruitParticipant({ recruitId, recruitApplicationId }),
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
