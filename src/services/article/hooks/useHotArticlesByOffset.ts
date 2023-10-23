import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import {
  defaultArticlesPageOffset,
  getHotArticlesByOffset,
} from '~/services/article/apis';
import { toMs } from '~/utils';

export interface UseHotArticlesByOffsetParams {
  keyword?: string;
  page?: number;
}

export const useHotArticlesByOffset = (
  params: UseHotArticlesByOffsetParams = {}
) => {
  const { keyword, page = defaultArticlesPageOffset } = params;
  const queryKey = queryKeys.articles.hotByOffset({
    searchKeyword: keyword,
    page,
  });

  return useQuery({
    queryKey,
    queryFn: () =>
      getHotArticlesByOffset({
        page,
        keyword,
      }),
    staleTime: toMs(30),
    keepPreviousData: true,
  });
};
