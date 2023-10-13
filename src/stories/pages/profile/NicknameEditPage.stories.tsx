import type { Meta, StoryObj } from '@storybook/react';

import { mockGetCertifiedSsafyMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { mockUpdateNickname } from '~/mocks/handlers/member/apis/mockUpdateNickname';
import { createMockValidateNickname } from '~/mocks/handlers/member/apis/mockValidateNickname';
import MyInfoSettingsNicknameEditPage from '~/pages/profile/myinfo-settings/nickname/edit';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const meta: Meta<typeof MyInfoSettingsNicknameEditPage> = {
  title: 'Page/프로필/내 정보 세팅/닉네임 수정',
  component: MyInfoSettingsNicknameEditPage,
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
      member: [],
      common: [mockUpdateNickname, mockGetCertifiedSsafyMyInfo],
    }),
  },
};

export default meta;

type NicknameEditPageStory = StoryObj<typeof MyInfoSettingsNicknameEditPage>;

export const Success: NicknameEditPageStory = {
  name: '정상',
  parameters: {
    ...createMswParameters({
      member: [createMockValidateNickname(true)],
    }),
  },
};

export const DuplicatedNickname: NicknameEditPageStory = {
  name: '닉네임 중복',
  parameters: {
    ...createMswParameters({
      member: [createMockValidateNickname(false)],
    }),
  },
};
