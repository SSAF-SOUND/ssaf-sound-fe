import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getMyScrapedArticlesByCursor } from '~/services/article/apis';
import { toMs } from '~/utils';

export const useMyScrapedArticlesByCursor = () => {
  return useInfiniteQuery({
    queryKey: queryKeys.articles.myScrapsByCursor(),
    queryFn: ({ pageParam }) =>
      getMyScrapedArticlesByCursor({ cursor: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.cursor ?? undefined;
    },
    staleTime: toMs(30),
  });
};
