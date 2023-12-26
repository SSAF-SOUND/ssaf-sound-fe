import type { NotificationDetail } from '~/services/notifications';

import { faker } from '@faker-js/faker';

import {
  NotificationCategory,
  NotificationServiceCategory,
} from '~/services/notifications';

export const createMockNotification = (
  id: number,
  options: Partial<{
    contentId: number;
    serviceCategory: NotificationServiceCategory;
    notificationCategory: NotificationCategory;
    read: boolean;
  }> = {}
): NotificationDetail => {
  const {
    contentId = 1,
    serviceCategory = NotificationServiceCategory.POST,
    notificationCategory = NotificationCategory.COMMENT_REPLY,
    read = false,
  } = options;
  return {
    notificationId: id,
    message: faker.lorem.lines(2),
    contentId,
    serviceType: serviceCategory,
    notificationType: notificationCategory,
    read,
    createdAt: faker.date.past().toISOString(),
  };
};

export const mockNotifications = Array(35)
  .fill(undefined)
  .map((_, index) => {
    return createMockNotification(index);
  });
