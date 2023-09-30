import type { Meta, StoryObj } from '@storybook/react';
import type { RecruitDetail } from '~/services/recruit';

import { createMockGetMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { mockUserInfo } from '~/mocks/handlers/member/data';
import { mockApproveRecruitApplication } from '~/mocks/handlers/recruit/apis/mockApproveRecruitApplication';
import { createMockGetRecruitApplication } from '~/mocks/handlers/recruit/apis/mockGetRecruitApplication';
import { createMockGetRecruitDetail } from '~/mocks/handlers/recruit/apis/mockGetRecruitDetail';
import { mockRejectRecruitApplication } from '~/mocks/handlers/recruit/apis/mockRejectRecruitApplication';
import {
  createMockRecruitApplication,
  createMockRecruitDetail,
} from '~/mocks/handlers/recruit/data';
import RecruitApplicationPage from '~/pages/recruits/[recruitId]/applications/[recruitApplicationId]';
import { MatchStatus, RecruitCategoryName } from '~/services/recruit';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const myInfo = mockUserInfo.certifiedSsafyUserInfo;
const otherUser = mockUserInfo.uncertifiedSsafyUserInfo;
const recruitId = 10000;
const recruitApplicationId = 10000;

const mockProjectApplication = createMockRecruitApplication(recruitId, {
  category: RecruitCategoryName.PROJECT,
  recruitApplicationId,
  author: otherUser,
});

const mockStudyApplication = createMockRecruitApplication(recruitId, {
  category: RecruitCategoryName.STUDY,
  recruitApplicationId,
  author: otherUser,
});

const mockProjectDetail = createMockRecruitDetail(recruitId, false, {
  mine: true,
  author: myInfo,
  completed: false,
});

const mockCompletedProjectDetail: RecruitDetail = {
  ...mockProjectDetail,
  finishedRecruit: true,
};

const mockStudyDetail = createMockRecruitDetail(recruitId, true, {
  mine: true,
  author: myInfo,
  completed: false,
});

const meta: Meta<typeof RecruitApplicationPage> = {
  title: 'Page/리쿠르팅/리쿠르팅 신청서',
  component: RecruitApplicationPage,
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
      common: [mockApproveRecruitApplication, mockRejectRecruitApplication],
    }),
  },
  args: {
    recruitId,
    recruitApplicationId,
  },
};

export default meta;

type RecruitApplicationPageStory = StoryObj<typeof RecruitApplicationPage>;

export const NotMine: RecruitApplicationPageStory = {
  name: '내 리쿠르팅이 아닌 경우',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitDetail({
          ...mockProjectDetail,
          mine: false,
          author: otherUser,
        }),
        createMockGetRecruitApplication(mockProjectApplication),
      ],
    }),
  },
};

export const PendingRecruitApplication: RecruitApplicationPageStory = {
  name: '응답 대기',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitDetail(mockProjectDetail),
        createMockGetRecruitApplication({
          ...mockProjectApplication,
          matchStatus: MatchStatus.PENDING,
        }),
      ],
    }),
  },
};

export const RejectedRecruitApplication: RecruitApplicationPageStory = {
  name: '거절함',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitDetail(mockProjectDetail),
        createMockGetRecruitApplication({
          ...mockProjectApplication,
          matchStatus: MatchStatus.REJECTED,
        }),
      ],
    }),
  },
};

export const SuccessRecruitApplication: RecruitApplicationPageStory = {
  name: '수락함',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitDetail(mockProjectDetail),
        createMockGetRecruitApplication({
          ...mockProjectApplication,
          matchStatus: MatchStatus.SUCCESS,
        }),
      ],
    }),
  },
};

export const InitialRecruitApplication: RecruitApplicationPageStory = {
  name: '응답 안함',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitDetail(mockCompletedProjectDetail),
        createMockGetRecruitApplication({
          ...mockProjectApplication,
          matchStatus: MatchStatus.INITIAL,
        }),
      ],
    }),
  },
};

export const Study: RecruitApplicationPageStory = {
  name: '스터디 리쿠르팅 신청서',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitDetail(mockStudyDetail),
        createMockGetRecruitApplication({
          ...mockStudyApplication,
          matchStatus: MatchStatus.PENDING,
        }),
      ],
    }),
  },
};
