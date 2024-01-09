import type { Meta, StoryObj } from '@storybook/react';

import {
  mockGetEmptyNotificationsByCursor,
  mockGetNotificationsByCursorError,
} from '~/mocks/handlers/notification/apis/mockGetNotificationsByCursor';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';
import { flex, fontCss, palettes } from '~/styles/utils';

import { NotificationPopover } from './index';

const meta: Meta<typeof NotificationPopover> = {
  title: 'Notification/Messages',
  component: NotificationPopover,
  decorators: [
    (Story) => (
      <PageLayout>
        <div css={[flex('center', 'center', 'row')]}>
          <Story />
        </div>

        <div css={[flex('', '', 'column', 8), { marginTop: '20vh' }]}>
          <div>
            <div css={bigFont}>1. 10초에 한 번 새로운 알림이 도착.</div>
            <div css={smallFont}>
              - 새로운 알림이 있는 경우 아이콘 우측상단에 빨간색 Mark 표시.
            </div>
          </div>
          <div css={bigFont}>2. 알림창을 열면, 빨간색 Mark가 즉시 지워짐</div>
          <div>
            <div css={bigFont}>
              3. 알림창이{' '}
              <span css={{ color: palettes.primary.default }}>열려 있는</span>{' '}
              상태에서 새로운 알림이 오면
            </div>
            <div css={smallFont}>
              <div>- 빨간색 Mark는 표시 하지 않고</div>
              <div>- 초록색 새로고침 Bar를 표시</div>
            </div>
          </div>
        </div>
      </PageLayout>
    ),
  ],
};

const bigFont = fontCss.style.B20;
const smallFont = [fontCss.style.R18, { paddingLeft: 32 }];

export default meta;

type NotificationStory = StoryObj<typeof NotificationPopover>;

export const Default: NotificationStory = {
  name: '정상',
};
export const Empty: NotificationStory = {
  name: '빈 알림',
  parameters: {
    ...createMswParameters({
      notification: [mockGetEmptyNotificationsByCursor],
    }),
  },
};

export const Error: NotificationStory = {
  name: '에러',
  parameters: {
    ...createMswParameters({
      notification: [mockGetNotificationsByCursorError],
    }),
  },
};
