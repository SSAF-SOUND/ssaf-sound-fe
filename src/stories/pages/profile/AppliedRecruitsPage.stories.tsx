import type { Meta, StoryObj } from '@storybook/react';

import { createMockGetMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { mockUserInfo } from '~/mocks/handlers/member/data';
import {
  mockGetAppliedRecruitsByCursor,
  mockGetAppliedRecruitsByCursorError,
  mockGetEmptyAppliedRecruitsByCursor,
} from '~/mocks/handlers/recruit/apis/mockGetAppliedRecruitsByCursor';
import AppliedRecruitsPage from '~/pages/profile/applied-recruits/[recruitCategoryName]';
import { RecruitCategoryName } from '~/services/recruit';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const myInfo = mockUserInfo.certifiedSsafyUserInfo;

const meta: Meta<typeof AppliedRecruitsPage> = {
  title: 'Page/프로필/지원한 리쿠르팅 목록',
  component: AppliedRecruitsPage,
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
      common: [createMockGetMyInfo(myInfo)],
      recruit: [mockGetAppliedRecruitsByCursor],
    }),
  },
  args: { recruitCategoryName: RecruitCategoryName.PROJECT },
};

export default meta;

type AppliedRecruitsPageStory = StoryObj<typeof AppliedRecruitsPage>;

export const Project: AppliedRecruitsPageStory = {
  name: '프로젝트',
};

export const Project__Empty: AppliedRecruitsPageStory = {
  name: '프로젝트 - 빈 데이터',
  parameters: {
    ...createMswParameters({
      recruit: [mockGetEmptyAppliedRecruitsByCursor],
    }),
  },
};

export const Study: AppliedRecruitsPageStory = {
  name: '스터디',
  args: { recruitCategoryName: RecruitCategoryName.STUDY },
};

export const Study__Empty: AppliedRecruitsPageStory = {
  name: '스터디 - 빈 데이터',
  parameters: {
    ...createMswParameters({
      recruit: [mockGetEmptyAppliedRecruitsByCursor],
    }),
  },
  args: { recruitCategoryName: RecruitCategoryName.STUDY },
};

export const Error: AppliedRecruitsPageStory = {
  name: '에러',
  parameters: {
    ...createMswParameters({
      recruit: [mockGetAppliedRecruitsByCursorError],
    }),
  },
};
