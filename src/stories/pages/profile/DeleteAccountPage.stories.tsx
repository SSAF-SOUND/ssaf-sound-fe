import type { Meta, StoryObj } from '@storybook/react';

import {
  mockDeleteAccount,
  mockDeleteAccountError,
} from '~/mocks/handlers/auth/apis/mockDeleteAccount';
import { mockGetCertifiedSsafyMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import DeleteAccountPage from '~/pages/profile/myinfo-settings/account/delete';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const meta: Meta<typeof DeleteAccountPage> = {
  title: 'Page/프로필/내 정보 세팅/회원 탈퇴',
  component: DeleteAccountPage,
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

type DeleteAccountPageStory = StoryObj<typeof DeleteAccountPage>;

export const Success: DeleteAccountPageStory = {
  name: '정상',
  parameters: {
    ...createMswParameters({
      auth: [mockDeleteAccount],
    }),
  },
};

export const Error: DeleteAccountPageStory = {
  name: '삭제 실패',
  parameters: {
    ...createMswParameters({
      auth: [mockDeleteAccountError],
    }),
  },
};
