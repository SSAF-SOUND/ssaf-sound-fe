import { useMutation } from '@tanstack/react-query';

import { completeRecruit } from '~/services/recruit/apis';

export const useCompleteRecruit = (recruitId: number) => {
  return useMutation({
    mutationFn: () => completeRecruit(recruitId),
  });
};
