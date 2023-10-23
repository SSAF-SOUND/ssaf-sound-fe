import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getMyArticlesByCursor } from '~/services/article/apis';

export const useMyArticles = () => {
  return useInfiniteQuery({
    queryKey: queryKeys.articles.mine(),
    queryFn: ({ pageParam }) => getMyArticlesByCursor({ cursor: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.cursor ?? undefined;
    },
  });
};
