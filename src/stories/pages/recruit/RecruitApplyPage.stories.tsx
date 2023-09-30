import type { Meta, StoryObj } from '@storybook/react';
import type { RecruitDetail } from '~/services/recruit';

import { createMockGetMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { mockUserInfo } from '~/mocks/handlers/member/data';
import { mockApplyRecruit } from '~/mocks/handlers/recruit/apis/mockApplyRecruit';
import { createMockGetRecruitDetail } from '~/mocks/handlers/recruit/apis/mockGetRecruitDetail';
import { createMockRecruitDetail } from '~/mocks/handlers/recruit/data';
import RecruitApplyPage from '~/pages/recruits/[recruitId]/apply';
import { MatchStatus } from '~/services/recruit';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const myInfo = mockUserInfo.certifiedSsafyUserInfo;
const author = mockUserInfo.uncertifiedSsafyUserInfo;

const meta: Meta<typeof RecruitApplyPage> = {
  title: 'Page/리쿠르팅/리쿠르팅 신청하기',
  component: RecruitApplyPage,
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
    }),
  },
};

const recruitId = 10000;

export default meta;

type RecruitApplyPageStory = StoryObj;

const projectDetailWithQuestion = createMockRecruitDetail(recruitId, false, {
  mine: false,
  author,
  matchStatus: MatchStatus.INITIAL,
  completed: false,
});

export const Project: RecruitApplyPageStory = {
  name: '프로젝트 신청하기',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitDetail(projectDetailWithQuestion),
        mockApplyRecruit,
      ],
    }),
  },
};

const studyDetail: RecruitDetail = createMockRecruitDetail(recruitId, true, {
  mine: false,
  author,
  matchStatus: MatchStatus.INITIAL,
  completed: false,
});

export const Study: RecruitApplyPageStory = {
  name: '스터디 신청하기',
  parameters: {
    ...createMswParameters({
      recruit: [createMockGetRecruitDetail(studyDetail), mockApplyRecruit],
    }),
  },
};

const pendingRecruitDetail: RecruitDetail = {
  ...projectDetailWithQuestion,
  matchStatus: MatchStatus.PENDING,
};

export const PendingApplicant: RecruitApplyPageStory = {
  name: '응답 대기 + 신청하기',
  parameters: {
    ...createMswParameters({
      recruit: [createMockGetRecruitDetail(pendingRecruitDetail)],
    }),
  },
};

const rejectedRecruitDetail: RecruitDetail = {
  ...projectDetailWithQuestion,
  matchStatus: MatchStatus.REJECTED,
};

export const RejectedApplicant: RecruitApplyPageStory = {
  name: '거절됨 + 신청하기',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitDetail(rejectedRecruitDetail),
        mockApplyRecruit,
      ],
    }),
  },
};

const successRecruitDetail: RecruitDetail = {
  ...projectDetailWithQuestion,
  matchStatus: MatchStatus.SUCCESS,
};

export const SuccessApplicant: RecruitApplyPageStory = {
  name: '수락됨 + 신청하기',
  parameters: {
    ...createMswParameters({
      recruit: [createMockGetRecruitDetail(successRecruitDetail)],
    }),
  },
};

const completedProjectDetail: RecruitDetail = createMockRecruitDetail(
  recruitId,
  false,
  {
    mine: false,
    author,
    completed: true,
  }
);

export const CompletedRecruit: RecruitApplyPageStory = {
  name: '종료된 리쿠르팅 신청하기',
  parameters: {
    ...createMswParameters({
      recruit: [createMockGetRecruitDetail(completedProjectDetail)],
    }),
  },
};

const myProjectDetail: RecruitDetail = createMockRecruitDetail(
  recruitId,
  false,
  {
    mine: true,
    author: myInfo,
    completed: false,
  }
);

export const Mine: RecruitApplyPageStory = {
  name: '내 리쿠르팅 신청하기',
  parameters: {
    ...createMswParameters({
      recruit: [createMockGetRecruitDetail(myProjectDetail)],
    }),
  },
};

const projectDetailWithoutQuestion: RecruitDetail = {
  ...projectDetailWithQuestion,
  questions: [''],
};

export const WithoutQuestion: RecruitApplyPageStory = {
  name: '등록자 질문이 없는 경우',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitDetail(projectDetailWithoutQuestion),
        mockApplyRecruit,
      ],
    }),
  },
};
