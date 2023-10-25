import type { Meta, StoryObj } from '@storybook/react';
import type { Params } from '~/pages/profile/[userId]';

import { ProfileTabs } from '~/components/Profile';
import { createMockGetMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { createMockGetUserInfo } from '~/mocks/handlers/member/apis/mockGetUserInfo';
import {
  mockGetEmptyUserPortfolio,
  mockGetUserPortfolio,
} from '~/mocks/handlers/member/apis/mockGetUserPortfolio';
import { createMockGetUserProfileVisibility } from '~/mocks/handlers/member/apis/mockGetUserProfileVisibility';
import { mockUserInfo } from '~/mocks/handlers/member/data';
import {
  mockGetEmptyJoinedRecruitsByOffset,
  mockGetJoinedRecruitsByOffset,
} from '~/mocks/handlers/recruit/apis/mockGetJoinedRecruitsByOffset';
import ProfilePage, { ParamsKey } from '~/pages/profile/[userId]';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const myInfo = mockUserInfo.uncertifiedSsafyUserInfo;
const otherUserInfo = mockUserInfo.certifiedSsafyUserInfo;

const meta: Meta<typeof ProfilePage> = {
  title: 'Page/프로필/다른 사람 프로필',
  component: ProfilePage,
  decorators: [
    (Story) => (
      <PageLayout css={{ overflow: 'unset' }}>
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

const getTabParameters = (tab: ProfileTabs) => {
  return {
    nextjs: {
      router: {
        query: {
          [ParamsKey.TAB]: tab,
        } as Params,
      },
    },
  };
};

type ProfilePageStory = StoryObj<typeof ProfilePage>;

export const Portfolio: ProfilePageStory = {
  name: '포트폴리오',
  parameters: {
    ...createMswParameters({
      member: [mockGetUserPortfolio, createMockGetUserProfileVisibility(true)],
      recruit: [mockGetJoinedRecruitsByOffset],
    }),
  },
};

export const EmptyPortfolio: ProfilePageStory = {
  name: '빈 포트폴리오',
  parameters: {
    ...createMswParameters({
      member: [
        mockGetEmptyUserPortfolio,
        createMockGetUserProfileVisibility(true),
      ],
      recruit: [mockGetEmptyJoinedRecruitsByOffset],
    }),
  },
};

export const JoinedProject: ProfilePageStory = {
  name: '참여중인 프로젝트',
  parameters: {
    ...Portfolio.parameters,
    ...getTabParameters(ProfileTabs.PROJECT),
  },
};

export const EmptyJoinedProject: ProfilePageStory = {
  name: '빈 참여중인 프로젝트',
  parameters: {
    ...EmptyPortfolio.parameters,
    ...getTabParameters(ProfileTabs.PROJECT),
  },
};

export const JoinedStudy: ProfilePageStory = {
  name: '스터디',
  parameters: {
    ...Portfolio.parameters,
    ...getTabParameters(ProfileTabs.STUDY),
  },
};

export const EmptyJoinedStudy: ProfilePageStory = {
  name: '빈 참여중인 스터디',
  parameters: {
    ...EmptyPortfolio.parameters,
    ...getTabParameters(ProfileTabs.STUDY),
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
