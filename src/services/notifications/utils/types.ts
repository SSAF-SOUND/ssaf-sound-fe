export enum NotificationServiceCategory {
  SYSTEM = 'SYSTEM',
  POST = 'POST',
  RECRUIT = 'RECRUIT',
}

export enum NotificationCategory {
  SYSTEM = 'SYSTEM',
  POST_REPLY = 'POST_REPLY',
  COMMENT_REPLY = 'COMMENT_REPLY',
  RECRUIT = 'RECRUIT',
}

export interface NotificationDetail {
  notificationId: number;
  message: string;
  contentId: number;
  serviceType: NotificationServiceCategory;
  notificationType: NotificationCategory;
  read: boolean;
  createAt: string;
}
