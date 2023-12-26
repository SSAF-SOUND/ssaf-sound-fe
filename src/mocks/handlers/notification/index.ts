import { mockGetHasNewNotifications } from '~/mocks/handlers/notification/apis/mockGetHasNewNotifications';
import { mockGetNotificationsByCursor } from '~/mocks/handlers/notification/apis/mockGetNotificationsByCursor';
import { mockGetNotificationsByOffset } from '~/mocks/handlers/notification/apis/mockGetNotificationsByOffset';

export const notificationHandlers = [
  mockGetHasNewNotifications,
  mockGetNotificationsByCursor,
  mockGetNotificationsByOffset,
];
