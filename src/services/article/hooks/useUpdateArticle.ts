import type { UpdateArticleParams } from '~/services/article/apis';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { updateArticle } from '~/services/article/apis';

export const useUpdateArticle = (articleId: number) => {
  const queryClient = useQueryClient();
  const onSuccess = () => {
    queryClient.invalidateQueries(queryKeys.articles.detail(articleId));
    queryClient.invalidateQueries(queryKeys.articles.mineBase());
  };

  return useMutation({
    mutationFn: (payload: Omit<UpdateArticleParams, 'articleId'>) =>
      updateArticle({ articleId, ...payload }),
    onSuccess,
  });
};
