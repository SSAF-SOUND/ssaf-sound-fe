import type { GetNotificationsByCursorApiData } from '~/services/notifications';

import { rest } from 'msw';

import { restInfiniteNotificationsSuccess } from '~/mocks/handlers/notification/utils';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const mockGetNotificationsByCursorMethod = 'get';
const mockGetNotificationsByCursorEndpoint = composeUrls(
  API_URL,
  endpoints.notification.listByCursor()
);

export const mockGetNotificationsByCursor = rest[
  mockGetNotificationsByCursorMethod
](mockGetNotificationsByCursorEndpoint, restInfiniteNotificationsSuccess);

export const mockGetNotificationsByCursorError = restError(
  mockGetNotificationsByCursorMethod,
  mockGetNotificationsByCursorEndpoint,
  {
    message: 'mockGetHasNewNotification Error',
  }
);

const emptyNotifications = {
  notifications: [],
  cursor: null,
};
export const mockGetEmptyNotificationsByCursor = restSuccess<
  GetNotificationsByCursorApiData['data']
>(mockGetNotificationsByCursorMethod, mockGetNotificationsByCursorEndpoint, {
  data: emptyNotifications,
});
