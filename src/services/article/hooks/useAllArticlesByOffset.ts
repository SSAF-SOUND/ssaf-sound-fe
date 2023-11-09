import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import {
  defaultArticlesPageOffset,
  getAllArticlesByOffset,
} from '~/services/article/apis';
import { toMs } from '~/utils/toMs';

export interface UseAllArticlesByOffsetParams {
  keyword?: string;
  page?: number;
}

export const useAllArticlesByOffset = (
  params: UseAllArticlesByOffsetParams
) => {
  const { keyword, page = defaultArticlesPageOffset } = params;
  const queryKey = queryKeys.articles.allListByOffset({
    searchKeyword: keyword,
    page,
  });

  return useQuery({
    queryKey,
    queryFn: () =>
      getAllArticlesByOffset({
        page,
        keyword,
      }),
    staleTime: toMs(30),
    keepPreviousData: true,
  });
};
