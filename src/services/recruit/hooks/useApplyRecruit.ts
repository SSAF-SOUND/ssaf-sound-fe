import type { ApplyRecruitParams } from '~/services/recruit/apis';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { applyRecruit } from '~/services/recruit/apis';

export const useApplyRecruit = (recruitId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ApplyRecruitParams) => applyRecruit(recruitId, params),
    onSuccess: () =>
      queryClient.invalidateQueries(queryKeys.recruit.detail(recruitId)),
  });
};
