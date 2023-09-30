import type { Meta, StoryObj } from '@storybook/react';

import { mockGetInitialMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { mockUpdateMyInfo } from '~/mocks/handlers/member/apis/mockUpdateMyInfo';
import { createMockValidateNickname } from '~/mocks/handlers/member/apis/mockValidateNickname';
import UserRegisterPage from '~/pages/auth/register';
import { useMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof UserRegisterPage> = {
  title: 'Page/인증/회원가입',
  component: UserRegisterPage,
  decorators: [
    (Story) => {
      useMyInfo({ enabled: true });

      return (
        <PageLayout>
          <Story />
        </PageLayout>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type UserRegisterPageStory = StoryObj<typeof UserRegisterPage>;

export const Default: UserRegisterPageStory = {
  name: '회원가입',
  parameters: {
    msw: {
      handlers: {
        member: [
          mockGetInitialMyInfo,
          createMockValidateNickname(true),
          mockUpdateMyInfo,
        ],
      },
    },
  },
};
