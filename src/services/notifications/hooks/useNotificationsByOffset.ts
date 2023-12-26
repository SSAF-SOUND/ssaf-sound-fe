import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import {
  defaultNotificationsPageOffset,
  getNotificationsByOffset,
} from '~/services/notifications';

export type UseNotificationsByOffset = Partial<{
  page: number;
}>;

export const useNotificationsByOffset = (
  options: UseNotificationsByOffset = {}
) => {
  const { page = defaultNotificationsPageOffset } = options;
  const queryKey = queryKeys.notification.listByOffset({ page });

  return useQuery({
    queryKey,
    queryFn: () => getNotificationsByOffset({ page }),
    keepPreviousData: true,
    staleTime: 0,
  });
};
