import type { SetStateAction } from 'react';
import type { ArticleDetail } from '~/services/article/utils';

import { useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';

export const useSetArticleDetail = (articleId: number) => {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.articles.detail(articleId);
  const setArticleDetail = (
    updater: SetStateAction<ArticleDetail | undefined>
  ) => {
    queryClient.setQueryData<ArticleDetail>(queryKey, updater);
  };

  return setArticleDetail;
};
