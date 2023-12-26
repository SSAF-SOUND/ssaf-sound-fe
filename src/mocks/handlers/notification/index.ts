import { mockGetHasNewNotifications } from '~/mocks/handlers/notification/apis/mockGetHasNewNotifications';
import { mockGetNotificationsByCursor } from '~/mocks/handlers/notification/apis/mockGetNotificationsByCursor';

export const notificationHandlers = [
  mockGetHasNewNotifications,
  mockGetNotificationsByCursor,
];
