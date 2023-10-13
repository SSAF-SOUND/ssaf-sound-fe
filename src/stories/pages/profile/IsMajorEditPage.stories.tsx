import type { Meta, StoryObj } from '@storybook/react';

import { mockGetCertifiedSsafyMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import {
  mockUpdateIsMajor,
  mockUpdateIsMajorError,
} from '~/mocks/handlers/member/apis/mockUpdateIsMajor';
import MyInfoSettingsIsMajorEditPage from '~/pages/profile/myinfo-settings/is-major/edit';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const meta: Meta<typeof MyInfoSettingsIsMajorEditPage> = {
  title: 'Page/프로필/내 정보 세팅/전공자 여부 수정',
  component: MyInfoSettingsIsMajorEditPage,
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
      common: [mockGetCertifiedSsafyMyInfo],
    }),
  },
};

export default meta;

type IsMajorEditPageStory = StoryObj<typeof MyInfoSettingsIsMajorEditPage>;

export const Default: IsMajorEditPageStory = {
  name: '정상',
  parameters: {
    ...createMswParameters({
      member: [mockUpdateIsMajor],
    }),
  },
};

export const Error: IsMajorEditPageStory = {
  name: '수정 에러',
  parameters: {
    ...createMswParameters({
      member: [mockUpdateIsMajorError],
    }),
  },
};
