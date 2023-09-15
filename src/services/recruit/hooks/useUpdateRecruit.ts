import type { UpdateRecruitParams } from '~/services/recruit/apis';

import { useMutation } from '@tanstack/react-query';

import { updateRecruit } from '~/services/recruit/apis';

export const useUpdateRecruit = (recruitId: number) => {
  return useMutation({
    mutationFn: (params: UpdateRecruitParams) =>
      updateRecruit(recruitId, params),
  });
};
