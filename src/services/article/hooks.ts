import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getArticleCategories } from '~/services/article/apis';

export const useArticleCategories = () => {
  return useQuery({
    queryKey: queryKeys.article.categories(),
    queryFn: getArticleCategories,
    select: (categories) => categories.sort((a, b) => a.boardId - b.boardId),
  });
};
