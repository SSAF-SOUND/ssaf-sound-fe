import type { Meta, StoryObj } from '@storybook/react';

import { createMockGetMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { mockUserInfo } from '~/mocks/handlers/member/data';
import { mockCancelRecruitApplication } from '~/mocks/handlers/recruit/apis/mockCancelRecruitApplication';
import { createMockGetMyRecruitApplication } from '~/mocks/handlers/recruit/apis/mockGetMyRecruitApplication';
import { createMockGetRecruitDetail } from '~/mocks/handlers/recruit/apis/mockGetRecruitDetail';
import {
  createMockMyRecruitApplication,
  createMockRecruitDetail,
} from '~/mocks/handlers/recruit/data';
import RecruitMyApplicationPage from '~/pages/recruits/[recruitId]/applications/mine';
import { MatchStatus, RecruitCategoryName } from '~/services/recruit';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const myInfo = mockUserInfo.certifiedSsafyUserInfo;
const otherUser = mockUserInfo.uncertifiedSsafyUserInfo;
const recruitId = 10000;
const recruitApplicationId = 10000;

const mockMyProjectApplication = createMockMyRecruitApplication(recruitId, {
  category: RecruitCategoryName.PROJECT,
  recruitApplicationId,
});

const mockMyStudyApplication = createMockMyRecruitApplication(recruitId, {
  category: RecruitCategoryName.STUDY,
  recruitApplicationId,
});

const mockProjectDetail = createMockRecruitDetail(recruitId, false, {
  mine: false,
  author: otherUser,
  completed: false,
});

const mockStudyDetail = createMockRecruitDetail(recruitId, true, {
  mine: false,
  author: otherUser,
  completed: false,
});

const meta: Meta<typeof RecruitMyApplicationPage> = {
  title: 'Page/Recruit/내 신청서',
  component: RecruitMyApplicationPage,
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
      member: [createMockGetMyInfo(myInfo)],
      common: [mockCancelRecruitApplication],
    }),
  },
  args: { recruitId },
};

export default meta;

type RecruitMyApplicationPageStory = StoryObj;

export const MyRecruit: RecruitMyApplicationPageStory = {
  name: '내 리쿠르팅',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitDetail({
          ...mockProjectDetail,
          mine: true,
          author: myInfo,
        }),
        createMockGetMyRecruitApplication(mockMyProjectApplication),
      ],
    }),
  },
};

export const Pending_And_NotCompletedRecruit: RecruitMyApplicationPageStory = {
  name: '응답 대기 + 모집중',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitDetail({
          ...mockProjectDetail,
          matchStatus: MatchStatus.PENDING,
        }),
        createMockGetMyRecruitApplication({
          ...mockMyProjectApplication,
          matchStatus: MatchStatus.PENDING,
        }),
      ],
    }),
  },
};

export const Pending_And_CompletedRecruit: RecruitMyApplicationPageStory = {
  name: '응답 대기 + 모집완료',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitDetail({
          ...mockProjectDetail,
          matchStatus: MatchStatus.PENDING,
          finishedRecruit: true,
        }),
        createMockGetMyRecruitApplication({
          ...mockMyProjectApplication,
          matchStatus: MatchStatus.PENDING,
        }),
      ],
    }),
  },
};

export const Initial_And_NotCompletedRecruit: RecruitMyApplicationPageStory = {
  name: '신청 취소 + 모집중',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitDetail({
          ...mockProjectDetail,
          matchStatus: MatchStatus.INITIAL,
        }),
        createMockGetMyRecruitApplication({
          ...mockMyProjectApplication,
          matchStatus: MatchStatus.INITIAL,
        }),
      ],
    }),
  },
};

export const Initial_And_CompletedRecruit: RecruitMyApplicationPageStory = {
  name: '신청 취소 + 모집완료',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitDetail({
          ...mockProjectDetail,
          matchStatus: MatchStatus.INITIAL,
          finishedRecruit: true,
        }),
        createMockGetMyRecruitApplication({
          ...mockMyProjectApplication,
          matchStatus: MatchStatus.INITIAL,
        }),
      ],
    }),
  },
};

export const Rejected_And_NotCompletedRecruit: RecruitMyApplicationPageStory = {
  name: '거절됨 + 모집중',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitDetail({
          ...mockProjectDetail,
          matchStatus: MatchStatus.REJECTED,
        }),
        createMockGetMyRecruitApplication({
          ...mockMyProjectApplication,
          matchStatus: MatchStatus.REJECTED,
        }),
      ],
    }),
  },
};

export const Rejected_And_CompletedRecruit: RecruitMyApplicationPageStory = {
  name: '거절됨 + 모집완료',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitDetail({
          ...mockProjectDetail,
          matchStatus: MatchStatus.REJECTED,
          finishedRecruit: true,
        }),
        createMockGetMyRecruitApplication({
          ...mockMyProjectApplication,
          matchStatus: MatchStatus.REJECTED,
        }),
      ],
    }),
  },
};

export const Success_And_NotCompletedRecruit: RecruitMyApplicationPageStory = {
  name: '수락됨 + 모집중',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitDetail({
          ...mockProjectDetail,
          matchStatus: MatchStatus.SUCCESS,
        }),
        createMockGetMyRecruitApplication({
          ...mockMyProjectApplication,
          matchStatus: MatchStatus.SUCCESS,
        }),
      ],
    }),
  },
};

export const Success_And_CompletedRecruit: RecruitMyApplicationPageStory = {
  name: '수락됨 + 모집완료',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitDetail({
          ...mockProjectDetail,
          matchStatus: MatchStatus.SUCCESS,
          finishedRecruit: true,
        }),
        createMockGetMyRecruitApplication({
          ...mockMyProjectApplication,
          matchStatus: MatchStatus.SUCCESS,
        }),
      ],
    }),
  },
};

export const Study: RecruitMyApplicationPageStory = {
  name: '스터디 리쿠르팅 내 신청서',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitDetail({
          ...mockStudyDetail,
          matchStatus: MatchStatus.SUCCESS,
          finishedRecruit: true,
        }),
        createMockGetMyRecruitApplication({
          ...mockMyStudyApplication,
          matchStatus: MatchStatus.SUCCESS,
        }),
      ],
    }),
  },
};
