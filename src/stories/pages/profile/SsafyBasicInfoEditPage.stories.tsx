import type { Meta, StoryObj } from '@storybook/react';

import {
  mockGetCertifiedSsafyMyInfo,
  mockGetUncertifiedSsafyMyInfo,
} from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { mockUpdateSsafyBasicInfo } from '~/mocks/handlers/member/apis/mockUpdateSsafyBasicInfo';
import MyInfoSettingsSsafyBasicInfoEditPage from '~/pages/profile/myinfo-settings/ssafy-basic-info/edit';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const meta: Meta<typeof MyInfoSettingsSsafyBasicInfoEditPage> = {
  title: 'Page/프로필/내 정보 세팅/SSAFY 기본정보 수정',
  component: MyInfoSettingsSsafyBasicInfoEditPage,
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
      common: [mockUpdateSsafyBasicInfo],
    }),
  },
};

export default meta;

type SsafyBasicInfoEditPageStory = StoryObj<
  typeof MyInfoSettingsSsafyBasicInfoEditPage
>;

export const UnCertifiedSsafyUser: SsafyBasicInfoEditPageStory = {
  name: 'SSAFY 멤버 + SSAFY 인증 안함',
  parameters: {
    ...createMswParameters({
      member: [mockGetUncertifiedSsafyMyInfo],
    }),
  },
};

export const CertifiedSsafyUser: SsafyBasicInfoEditPageStory = {
  name: 'SSAFY 멤버 + SSAFY 인증 완료',

  parameters: {
    ...createMswParameters({
      member: [mockGetCertifiedSsafyMyInfo],
    }),
  },
};
