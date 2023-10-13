import type { Meta, StoryObj } from '@storybook/react';

import {
  mockGetCertifiedSsafyMyInfo,
  mockGetNonSsafyMyInfo,
  mockGetUncertifiedSsafyMyInfo,
} from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { mockGetProfileVisibility } from '~/mocks/handlers/member/apis/mockGetProfileVisibility';
import {
  mockUpdateProfileVisibility,
  mockUpdateProfileVisibilityError,
} from '~/mocks/handlers/member/apis/mockUpdateProfileVisibility';
import MyInfoSettingsPage from '~/pages/profile/myinfo-settings';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const meta: Meta<typeof MyInfoSettingsPage> = {
  title: 'Page/프로필/내 정보 세팅/루트 페이지',
  component: MyInfoSettingsPage,
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
      common: [mockGetProfileVisibility, mockUpdateProfileVisibility],
    }),
  },
};

export default meta;

type MyInfoSettingsPageStory = StoryObj<typeof MyInfoSettingsPage>;

export const NonSsafyUser: MyInfoSettingsPageStory = {
  name: 'SSAFY 멤버가 아닌 경우',
  parameters: {
    ...createMswParameters({
      member: [mockGetNonSsafyMyInfo],
    }),
  },
};

export const UnCertifiedSsafyUser: MyInfoSettingsPageStory = {
  name: 'SSAFY 멤버 + SSAFY 인증 안함',
  parameters: {
    ...createMswParameters({
      member: [mockGetUncertifiedSsafyMyInfo],
    }),
  },
};

export const CertifiedSsafyUser: MyInfoSettingsPageStory = {
  name: 'SSAFY 멤버 + SSAFY 인증 완료',
  parameters: {
    ...createMswParameters({
      member: [mockGetCertifiedSsafyMyInfo],
    }),
  },
};

export const ProfileVisibilityToggleError: MyInfoSettingsPageStory = {
  name: '프로필 공개여부 토글 오류',
  parameters: {
    ...createMswParameters({
      member: [mockGetCertifiedSsafyMyInfo],
      common: [mockGetProfileVisibility, mockUpdateProfileVisibilityError],
    }),
  },
};
