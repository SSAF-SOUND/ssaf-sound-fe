import { useMutation } from '@tanstack/react-query';

import { removeRecruit } from '~/services/recruit/apis';

export const useRemoveRecruit = (recruitId: number) => {
  return useMutation({
    mutationFn: () => removeRecruit(recruitId),
  });
};
