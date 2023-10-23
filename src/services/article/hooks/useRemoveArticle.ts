import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { removeArticle } from '~/services/article/apis';

export const useRemoveArticle = (articleId: number) => {
  const queryClient = useQueryClient();
  const onSuccess = () => {
    queryClient.invalidateQueries(queryKeys.articles.detail(articleId));
    queryClient.invalidateQueries(queryKeys.articles.mineBase());
  };
  return useMutation({
    mutationFn: () => removeArticle({ articleId }),
    onSuccess,
  });
};
