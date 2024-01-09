import type { InfiniteParams } from '~/services/common';
import type { NotificationDetail } from '~/services/notifications/utils/types';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import {
  defaultNotificationsPageCursor,
  defaultNotificationsPageSize,
} from '~/services/notifications/apis/constants';
import { privateAxios } from '~/utils';

export type GetNotificationsByCursorParams = Partial<InfiniteParams>;

export interface GetNotificationsByCursorQueryParams extends InfiniteParams {}

export type GetNotificationsByCursorApiData = ApiSuccessResponse<{
  notifications: NotificationDetail[];
  cursor: number | null;
}>;

export const getNotificationsByCursor = (
  params: GetNotificationsByCursorParams
) => {
  const {
    cursor = defaultNotificationsPageCursor,
    size = defaultNotificationsPageSize,
  } = params;
  const endpoint = endpoints.notification.listByCursor();
  const queryParams: GetNotificationsByCursorQueryParams = {
    cursor,
    size,
  };

  return privateAxios<GetNotificationsByCursorApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
