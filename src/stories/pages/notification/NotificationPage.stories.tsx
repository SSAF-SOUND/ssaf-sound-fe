import type { Meta, StoryObj } from '@storybook/react';

import { mockGetCertifiedSsafyMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import {
  mockGetEmptyNotificationsByOffset,
  mockGetNotificationsByOffset,
  mockGetNotificationsByOffsetError,
} from '~/mocks/handlers/notification/apis/mockGetNotificationsByOffset';
import NotificationPage from '~/pages/notifications';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const meta: Meta<typeof NotificationPage> = {
  title: 'Page/알림',
  component: NotificationPage,
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    ...createMswParameters({
      member: [mockGetCertifiedSsafyMyInfo],
    }),
  },
};

export default meta;

type NotificationPageStory = StoryObj<typeof NotificationPage>;

export const Success: NotificationPageStory = {
  name: '정상',
  parameters: {
    ...createMswParameters({
      auth: [mockGetNotificationsByOffset],
    }),
  },
};

export const Empty: NotificationPageStory = {
  name: '빈 알림',
  parameters: {
    ...createMswParameters({
      auth: [mockGetEmptyNotificationsByOffset],
    }),
  },
};

export const Error: NotificationPageStory = {
  name: '에러',
  parameters: {
    ...createMswParameters({
      auth: [mockGetNotificationsByOffsetError],
    }),
  },
};
