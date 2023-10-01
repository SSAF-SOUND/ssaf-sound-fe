import { useMutation } from '@tanstack/react-query';

import { removeArticle } from '~/services/article/apis';

export const useRemoveArticle = (articleId: number) => {
  return useMutation({
    mutationFn: () => removeArticle({ articleId }),
  });
};
