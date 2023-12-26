import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getNotificationsByCursor } from '~/services/notifications';

export const useNotificationsByCursor = () => {
  const queryKey = queryKeys.notification.listByCursor();
  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      getNotificationsByCursor({
        cursor: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.cursor ?? undefined;
    },
    staleTime: Infinity,
  });
};
