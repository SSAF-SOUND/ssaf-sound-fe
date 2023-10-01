import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getMyArticles } from '~/services/article/apis';

export const useMyArticles = () => {
  return useInfiniteQuery({
    queryKey: queryKeys.articles.mine(),
    queryFn: ({ pageParam }) => getMyArticles({ cursor: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.cursor ?? undefined;
    },
  });
};
