import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getMyArticlesByCursor } from '~/services/article/apis';
import { toMs } from '~/utils';

export const useMyArticlesByCursor = () => {
  return useInfiniteQuery({
    queryKey: queryKeys.articles.mineByCursor(),
    queryFn: ({ pageParam }) => getMyArticlesByCursor({ cursor: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.cursor ?? undefined;
    },
    staleTime: toMs(30),
  });
};
