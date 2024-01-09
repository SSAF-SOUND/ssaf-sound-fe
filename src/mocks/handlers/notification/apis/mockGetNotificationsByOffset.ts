import { rest } from 'msw';

import { paginatedNotificationsHandler } from '~/mocks/handlers/notification/utils';
import { restError } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getNotificationsByOffsetMethod = 'get';
const getNotificationsByOffsetEndpoint = composeUrls(
  API_URL,
  endpoints.notification.listByOffset()
);

export const mockGetNotificationsByOffset = rest[
  getNotificationsByOffsetMethod
](getNotificationsByOffsetEndpoint, paginatedNotificationsHandler(false));

export const mockGetNotificationsByOffsetError = restError(
  getNotificationsByOffsetMethod,
  getNotificationsByOffsetEndpoint,
  {
    message: 'mockGetNotificationsByOffsetByOffset Error',
  }
);

export const mockGetEmptyNotificationsByOffset = rest[
  getNotificationsByOffsetMethod
](getNotificationsByOffsetEndpoint, paginatedNotificationsHandler(true, 0));
