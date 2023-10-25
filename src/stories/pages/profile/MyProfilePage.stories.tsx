import type { Meta, StoryObj } from '@storybook/react';
import type { Params } from '~/pages/profile';

import { ProfileTabs } from '~/components/Profile';
import { createMockGetMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import {
  mockGetMyEmptyPortfolio,
  mockGetMyPortfolio,
} from '~/mocks/handlers/member/apis/mockGetMyPortfolio';
import { mockUserInfo } from '~/mocks/handlers/member/data';
import {
  mockGetEmptyJoinedRecruitsByOffset,
  mockGetJoinedRecruitsByOffset,
} from '~/mocks/handlers/recruit/apis/mockGetJoinedRecruitsByOffset';
import MyProfilePage, { ParamsKey } from '~/pages/profile';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const myInfo = mockUserInfo.certifiedSsafyUserInfo;

const meta: Meta<typeof MyProfilePage> = {
  title: 'Page/프로필/내 프로필',
  component: MyProfilePage,
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
      common: [createMockGetMyInfo(myInfo)],
    }),
  },
};

export default meta;

type MyProfilePageStory = StoryObj<typeof MyProfilePage>;
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

export const Portfolio: MyProfilePageStory = {
  name: '포트폴리오',
  parameters: {
    ...createMswParameters({
      member: [mockGetMyPortfolio],
      recruit: [mockGetJoinedRecruitsByOffset],
    }),
  },
};

export const EmptyPortfolio: MyProfilePageStory = {
  name: '빈 포트폴리오',
  parameters: {
    ...createMswParameters({
      member: [mockGetMyEmptyPortfolio],
      recruit: [mockGetEmptyJoinedRecruitsByOffset],
    }),
  },
};

export const JoinedProject: MyProfilePageStory = {
  name: '참여중인 프로젝트',
  parameters: {
    ...Portfolio.parameters,
    ...getTabParameters(ProfileTabs.PROJECT),
  },
};

export const EmptyJoinedProject: MyProfilePageStory = {
  name: '빈 참여중인 프로젝트',
  parameters: {
    ...EmptyPortfolio.parameters,
    ...getTabParameters(ProfileTabs.PROJECT),
  },
};

export const JoinedStudy: MyProfilePageStory = {
  name: '스터디',
  parameters: {
    ...Portfolio.parameters,
    ...getTabParameters(ProfileTabs.STUDY),
  },
};

export const EmptyJoinedStudy: MyProfilePageStory = {
  name: '빈 참여중인 스터디',
  parameters: {
    ...EmptyPortfolio.parameters,
    ...getTabParameters(ProfileTabs.STUDY),
  },
};
