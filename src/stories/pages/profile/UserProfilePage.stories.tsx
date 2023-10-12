import type { Meta, StoryObj } from '@storybook/react';

import { createMockGetMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { createMockGetUserInfo } from '~/mocks/handlers/member/apis/mockGetUserInfo';
import {
  mockGetEmptyUserPortfolio,
  mockGetUserPortfolio,
} from '~/mocks/handlers/member/apis/mockGetUserPortfolio';
import { createMockGetUserProfileVisibility } from '~/mocks/handlers/member/apis/mockGetUserProfileVisibility';
import { mockUserInfo } from '~/mocks/handlers/member/data';
import {
  mockGetEmptyJoinedRecruits,
  mockGetJoinedRecruits,
} from '~/mocks/handlers/recruit/apis/mockGetJoinedRecruits';
import ProfilePage from '~/pages/profile/[userId]';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const myInfo = mockUserInfo.uncertifiedSsafyUserInfo;
const otherUserInfo = mockUserInfo.certifiedSsafyUserInfo;

const meta: Meta<typeof ProfilePage> = {
  title: 'Page/프로필/다른 사람 프로필',
  component: ProfilePage,
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
      common: [
        createMockGetMyInfo(myInfo),
        createMockGetUserInfo(otherUserInfo),
      ],
    }),
  },
};

export default meta;

type ProfilePageStory = StoryObj<typeof ProfilePage>;

export const Default: ProfilePageStory = {
  name: '정상',
  parameters: {
    ...createMswParameters({
      member: [mockGetUserPortfolio, createMockGetUserProfileVisibility(true)],
      recruit: [mockGetJoinedRecruits],
    }),
  },
};

export const Empty: ProfilePageStory = {
  name: '빈 데이터',
  parameters: {
    ...createMswParameters({
      member: [
        mockGetEmptyUserPortfolio,
        createMockGetUserProfileVisibility(true),
      ],
      recruit: [mockGetEmptyJoinedRecruits],
    }),
  },
};

export const IsPrivate: ProfilePageStory = {
  name: '프로필 비공개',
  parameters: {
    ...createMswParameters({
      member: [mockGetUserPortfolio, createMockGetUserProfileVisibility(false)],
    }),
  },
};
