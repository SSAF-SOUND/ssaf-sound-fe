import type { PaginationParams, PaginationStatus } from '~/services/common';
import type { NotificationDetail } from '~/services/notifications/utils/types';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import {
  defaultNotificationsPageOffset,
  defaultNotificationsPageSize,
} from '~/services/notifications/apis/constants';
import { privateAxios } from '~/utils';

export type GetNotificationsByOffsetParams = Partial<PaginationParams>;

export interface GetNotificationsByOffsetQueryParams extends PaginationParams {}

export type GetNotificationsByOffsetApiData = ApiSuccessResponse<
  {
    notifications: NotificationDetail[];
  } & PaginationStatus
>;

export const getNotificationsByOffset = (
  params: GetNotificationsByOffsetParams
) => {
  const {
    page = defaultNotificationsPageOffset,
    size = defaultNotificationsPageSize,
  } = params;
  const endpoint = endpoints.notification.listByOffset();
  const queryParams: GetNotificationsByOffsetQueryParams = {
    page,
    size,
  };

  return privateAxios<GetNotificationsByOffsetApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
