import type { UpdateRecruitParams } from '~/services/recruit/apis';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { updateRecruit } from '~/services/recruit/apis';

export const useUpdateRecruit = (recruitId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UpdateRecruitParams) =>
      updateRecruit(recruitId, params),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.recruit.detail(recruitId));
    },
  });
};
