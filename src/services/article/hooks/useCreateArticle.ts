import { useMutation } from '@tanstack/react-query';

import { createArticle } from '~/services/article/apis';

export const useCreateArticle = () => {
  return useMutation({
    mutationFn: createArticle,
  });
};
