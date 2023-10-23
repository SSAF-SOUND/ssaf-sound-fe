import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import {
  defaultArticlesPageOffset,
  getMyArticlesByOffset,
} from '~/services/article/apis';
import { toMs } from '~/utils';

export interface UseMyArticlesByOffsetParams {
  page?: number;
}

export const useMyArticlesByOffset = (
  params: UseMyArticlesByOffsetParams = {}
) => {
  const { page = defaultArticlesPageOffset } = params;
  return useQuery({
    queryKey: queryKeys.articles.mineByOffset({ page }),
    queryFn: () => getMyArticlesByOffset({ page }),
    staleTime: toMs(30),
  });
};
