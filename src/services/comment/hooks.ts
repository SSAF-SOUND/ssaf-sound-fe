import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { createComment, getComments } from '~/services/comment/apis';

export const useComments = (articleId: number) => {
  return useQuery({
    queryKey: queryKeys.comments.list(articleId),
    queryFn: () => getComments(articleId),
  });
};

export const useInvalidateComments = (articleId: number) => {
  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries(queryKeys.comments.list(articleId));

  return invalidate;
};

export const useCreateComment = () => {
  return useMutation({
    mutationFn: createComment,
  });
};
