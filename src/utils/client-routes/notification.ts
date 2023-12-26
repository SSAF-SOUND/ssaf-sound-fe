// ---------- notification self ----------

import { createRoute } from '~/utils/client-routes/utils';

const notificationSelfRoute = () => createRoute('/notifications')();

export type NotificationPageRouteQuery = {
  page?: number;
};

const notificationSelfPageRoute = (query: NotificationPageRouteQuery = {}) => {
  const pathname = notificationSelfRoute().pathname;

  return createRoute<NotificationPageRouteQuery>(pathname)(query);
};

export const notification = {
  self: notificationSelfPageRoute,
};
