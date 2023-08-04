import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getComments } from '~/services/comment/apis';

export const useComments = (articleId: number) => {
  return useQuery({
    queryKey: queryKeys.comments.list(articleId),
    queryFn: () => getComments(articleId),
  });
};
