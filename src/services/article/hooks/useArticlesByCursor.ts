import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getArticlesByCursor } from '~/services/article/apis';

interface UseArticlesOptions {
  keyword: string;
}

export const useArticlesByCursor = (
  categoryId: number,
  options: Partial<UseArticlesOptions> = {}
) => {
  const { keyword } = options;
  const queryKey = queryKeys.articles.list(categoryId, keyword);

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      getArticlesByCursor({
        cursor: pageParam,
        categoryId,
        keyword,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.cursor ?? undefined;
    },
  });
};
