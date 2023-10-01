import type { UpdateArticleParams } from '~/services/article/apis';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { updateArticle } from '~/services/article/apis';

export const useUpdateArticle = (articleId: number) => {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.articles.detail(articleId);
  const onSuccess = () => queryClient.invalidateQueries(queryKey);

  return useMutation({
    mutationFn: (payload: Omit<UpdateArticleParams, 'articleId'>) =>
      updateArticle({ articleId, ...payload }),
    onSuccess,
  });
};
