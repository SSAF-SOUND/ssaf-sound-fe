import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getArticleDetail } from '~/services/article/apis';

export const useArticleDetail = (articleId: number) => {
  return useQuery({
    queryKey: queryKeys.articles.detail(articleId),
    queryFn: () => getArticleDetail(articleId),
  });
};
