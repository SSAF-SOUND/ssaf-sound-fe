import type { Meta, StoryObj } from '@storybook/react';
import type { RecruitDetail } from '~/services/recruit';

import { mockGetCertifiedSsafyMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { mockUserInfo } from '~/mocks/handlers/member/data';
import { createMockGetRecruitApplicants } from '~/mocks/handlers/recruit/apis/mockGetRecruitApplicants';
import { createMockGetRecruitDetail } from '~/mocks/handlers/recruit/apis/mockGetRecruitDetail';
import { createMockGetRecruitParticipants } from '~/mocks/handlers/recruit/apis/mockGetRecruitParticipants';
import { mockLikeRecruitApplication } from '~/mocks/handlers/recruit/apis/mockLikeRecruitApplication';
import { mockRejectRecruitApplication } from '~/mocks/handlers/recruit/apis/mockRejectRecruitApplication';
import {
  createMockRecruitApplicants,
  createMockRecruitDetail,
  createMockRecruitParticipants,
} from '~/mocks/handlers/recruit/data';
import RecruitPendingApplicantsPage from '~/pages/recruits/[recruitId]/applications';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const recruitId = 10000;
const myInfo = mockUserInfo.certifiedSsafyUserInfo;
const otherUserInfo = mockUserInfo.uncertifiedSsafyUserInfo;
const mockProjectDetail = createMockRecruitDetail(recruitId, false, {
  mine: true,
  author: myInfo,
  completed: false,
});
const mockStudyDetail = createMockRecruitDetail(recruitId, true, {
  mine: true,
  author: myInfo,
  completed: false,
});

const meta: Meta<typeof RecruitPendingApplicantsPage> = {
  title: 'Page/Recruit/리쿠르팅 신청서 목록',
  component: RecruitPendingApplicantsPage,
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
      member: [mockGetCertifiedSsafyMyInfo],
      recruit: [
        createMockGetRecruitApplicants(
          createMockRecruitApplicants(mockProjectDetail)
        ),
        createMockGetRecruitParticipants(
          createMockRecruitParticipants(mockProjectDetail)
        ),
        createMockGetRecruitDetail(mockProjectDetail),
      ],
      common: [mockLikeRecruitApplication, mockRejectRecruitApplication],
    }),
  },
  args: {
    recruitId,
  },
};

export default meta;

type RecruitPendingApplicantsPageStory = StoryObj<
  typeof RecruitPendingApplicantsPage
>;

export const PendingRecruit: RecruitPendingApplicantsPageStory = {
  name: '모집중인 리쿠르팅의 신청서 목록',
};

const completedProjectDetail: RecruitDetail = {
  ...mockProjectDetail,
  finishedRecruit: true,
};

export const CompletedRecruit: RecruitPendingApplicantsPageStory = {
  name: '종료된 리쿠르팅의 신청서 목록',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitApplicants(
          createMockRecruitApplicants(completedProjectDetail)
        ),
        createMockGetRecruitParticipants(
          createMockRecruitParticipants(completedProjectDetail)
        ),
        createMockGetRecruitDetail(completedProjectDetail),
      ],
    }),
  },
};

export const Study: RecruitPendingApplicantsPageStory = {
  name: '스터디 리쿠르팅의 신청서 목록',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitApplicants(
          createMockRecruitApplicants(mockStudyDetail)
        ),
        createMockGetRecruitParticipants(
          createMockRecruitParticipants(mockStudyDetail)
        ),
        createMockGetRecruitDetail(mockStudyDetail),
      ],
    }),
  },
};

const notMyRecruitDetail: RecruitDetail = {
  ...mockProjectDetail,
  mine: false,
  author: otherUserInfo,
};

export const NotMine: RecruitPendingApplicantsPageStory = {
  name: '내 리쿠르팅이 아님',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitApplicants(
          createMockRecruitApplicants(notMyRecruitDetail)
        ),
        createMockGetRecruitDetail(notMyRecruitDetail),
      ],
    }),
  },
};
