import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import {
  defaultArticlesPageOffset,
  getMyScrapedArticlesByOffset,
} from '~/services/article/apis';
import { toMs } from '~/utils';

export interface UseMyScrapedArticlesByOffsetParams {
  page?: number;
}

export const useMyScrapedArticlesByOffset = (
  params: UseMyScrapedArticlesByOffsetParams
) => {
  const { page = defaultArticlesPageOffset } = params;
  return useQuery({
    queryKey: queryKeys.articles.myScrapedByOffset({ page }),
    queryFn: () => getMyScrapedArticlesByOffset({ page }),
    staleTime: toMs(30),
  });
};
