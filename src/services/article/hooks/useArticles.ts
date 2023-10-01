import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getArticles } from '~/services/article/apis';

interface UseArticlesOptions {
  keyword: string;
}

export const useArticles = (
  categoryId: number,
  options: Partial<UseArticlesOptions> = {}
) => {
  const { keyword } = options;
  const queryKey = queryKeys.articles.list(categoryId, keyword);

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      getArticles({
        cursor: pageParam,
        categoryId,
        keyword,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.cursor ?? undefined;
    },
  });
};
