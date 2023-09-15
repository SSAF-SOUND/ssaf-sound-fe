import { useMutation } from '@tanstack/react-query';

import { createRecruit } from '~/services/recruit/apis';

export const useCreateRecruit = () => {
  return useMutation({
    mutationFn: createRecruit,
  });
};
