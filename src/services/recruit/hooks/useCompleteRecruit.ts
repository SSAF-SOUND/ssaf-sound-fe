import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { completeRecruit } from '~/services/recruit/apis';

export const useCompleteRecruit = (recruitId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => completeRecruit(recruitId),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.recruit.detail(recruitId));
    },
  });
};
