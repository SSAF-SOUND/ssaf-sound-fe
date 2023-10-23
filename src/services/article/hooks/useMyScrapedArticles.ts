import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getMyScrapedArticlesByCursor } from '~/services/article/apis';

export const useMyScrapedArticles = () => {
  return useInfiniteQuery({
    queryKey: queryKeys.articles.myScraped(),
    queryFn: ({ pageParam }) => getMyScrapedArticlesByCursor({ cursor: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.cursor ?? undefined;
    },
  });
};
