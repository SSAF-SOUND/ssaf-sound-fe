import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { createArticle } from '~/services/article/apis';

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  const onSuccess = () => {
    queryClient.invalidateQueries(queryKeys.articles.mineBase());
  };
  return useMutation({
    mutationFn: createArticle,
    onSuccess,
  });
};
