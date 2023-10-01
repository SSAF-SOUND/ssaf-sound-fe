import { useMutation } from '@tanstack/react-query';

import { removeArticle } from '~/services/article/apis';

export const useRemoveArticle = () => {
  return useMutation({
    mutationFn: removeArticle,
  });
};
