import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import {
  defaultArticlesPageOffset,
  getArticlesByOffset,
} from '~/services/article/apis';
import { toMs } from '~/utils';

export interface UseArticlesByOffsetParams {
  categoryId: number;
  keyword?: string;
  page?: number;
}

export const useArticlesByOffset = (params: UseArticlesByOffsetParams) => {
  const { keyword, categoryId, page = defaultArticlesPageOffset } = params;
  const queryKey = queryKeys.articles.listByOffset({
    categoryId,
    searchKeyword: keyword,
    page,
  });

  return useQuery({
    queryKey,
    queryFn: () =>
      getArticlesByOffset({
        page,
        categoryId,
        keyword,
      }),
    staleTime: toMs(30),
  });
};
