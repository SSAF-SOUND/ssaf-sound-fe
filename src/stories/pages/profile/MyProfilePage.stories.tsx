import type { Meta, StoryObj } from '@storybook/react';

import { createMockGetMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import {
  mockGetMyEmptyPortfolio,
  mockGetMyPortfolio,
} from '~/mocks/handlers/member/apis/mockGetMyPortfolio';
import { mockUserInfo } from '~/mocks/handlers/member/data';
import {
  mockGetEmptyJoinedRecruits,
  mockGetJoinedRecruits,
} from '~/mocks/handlers/recruit/apis/mockGetJoinedRecruits';
import MyProfilePage from '~/pages/profile';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const myInfo = mockUserInfo.certifiedSsafyUserInfo;

const meta: Meta<typeof MyProfilePage> = {
  title: 'Page/프로필/내 프로필',
  component: MyProfilePage,
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
      common: [createMockGetMyInfo(myInfo)],
    }),
  },
};

export default meta;

type MyProfilePageStory = StoryObj<typeof MyProfilePage>;

export const Default: MyProfilePageStory = {
  name: '정상',
  parameters: {
    ...createMswParameters({
      member: [mockGetMyPortfolio],
      recruit: [mockGetJoinedRecruits],
    }),
  },
};

export const Empty: MyProfilePageStory = {
  name: '빈 데이터',
  parameters: {
    ...createMswParameters({
      member: [mockGetMyEmptyPortfolio],
      recruit: [mockGetEmptyJoinedRecruits],
    }),
  },
};
