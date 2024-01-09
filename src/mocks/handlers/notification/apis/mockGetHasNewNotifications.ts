import type { GetHasNewNotificationsApiData } from '~/services/notifications';

import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const mockGetHasNewNotificationsMethod = 'get';
const mockGetHasNewNotificationsEndpoint = composeUrls(
  API_URL,
  endpoints.notification.hasNew()
);

export const mockGetHasNewNotifications = restSuccess<
  GetHasNewNotificationsApiData['data']
>(mockGetHasNewNotificationsMethod, mockGetHasNewNotificationsEndpoint, {
  data: { isNew: true },
});

export const mockGetHasNewNotificationsError = restError(
  mockGetHasNewNotificationsMethod,
  mockGetHasNewNotificationsEndpoint,
  {
    message: 'mockGetHasNewNotification Error',
  }
);
