import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { removeRecruit } from '~/services/recruit/apis';

export const useRemoveRecruit = (recruitId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => removeRecruit(recruitId),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.recruit.detail(recruitId));
    },
  });
};
