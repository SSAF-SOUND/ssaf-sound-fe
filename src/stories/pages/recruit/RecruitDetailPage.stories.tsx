import type { Meta } from '@storybook/react';
import type { RecruitDetail } from '~/services/recruit';

import {
  createMockGetMyInfo,
  mockGetMyInfoError,
} from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { mockUserInfo } from '~/mocks/handlers/member/data';
import { createMockGetRecruitDetail } from '~/mocks/handlers/recruit/apis/mockGetRecruitDetail';
import { createMockGetRecruitParticipants } from '~/mocks/handlers/recruit/apis/mockGetRecruitParticipants';
import {
  createMockRecruitDetail,
  createMockRecruitParticipants,
} from '~/mocks/handlers/recruit/data';
import RecruitDetailPage from '~/pages/recruits/[recruitId]';
import { useMyInfo } from '~/services/member';
import { MatchStatus } from '~/services/recruit';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters, disableArgs } from '~/stories/utils';

// 리쿠르팅 상태: 모집 미완료 | 모집 완료
// 리쿠르팅 종류: 프로젝트 | 스터디
// 리쿠르팅 유저: 지원자 | 참여자 | 작성자(mine) | 로그아웃 유저

const recruitId = 10000;

const projectDetail = createMockRecruitDetail(recruitId, false, {
  completed: false,
  mine: false,
  matchStatus: MatchStatus.INITIAL,
});
const studyDetail = createMockRecruitDetail(recruitId, true, {
  completed: false,
  mine: false,
  matchStatus: MatchStatus.INITIAL,
});

const meta: Meta<typeof RecruitDetailPage> = {
  title: 'Page/Recruit/Detail',
  component: RecruitDetailPage,
  decorators: [
    (Story) => {
      useMyInfo({ enabled: true });

      return (
        <PageLayout>
          <Story />
        </PageLayout>
      );
    },
  ],
  args: { recruitId },
  argTypes: { ...disableArgs(['recruitId']) },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const NotSignedIn = {
  name: '로그인 하지 않음',
  parameters: {
    ...createMswParameters({
      member: [mockGetMyInfoError],
      recruit: [
        createMockGetRecruitDetail(projectDetail),
        createMockGetRecruitParticipants(
          createMockRecruitParticipants(projectDetail)
        ),
      ],
    }),
  },
};

const myInfo = mockUserInfo.certifiedSsafyUserInfo;
const otherUser = mockUserInfo.uncertifiedSsafyUserInfo;
const myRecruitDetail: RecruitDetail = {
  ...projectDetail,
  author: myInfo,
  mine: true,
};

export const Mine = {
  name: '내 리쿠르팅',
  parameters: {
    ...createMswParameters({
      member: [createMockGetMyInfo(myInfo)],
      recruit: [
        createMockGetRecruitDetail(myRecruitDetail),
        createMockGetRecruitParticipants(
          createMockRecruitParticipants(myRecruitDetail)
        ),
      ],
    }),
  },
};

const initialAndNotCompletedRecruitDetail: RecruitDetail = {
  ...myRecruitDetail,
  mine: false,
  matchStatus: MatchStatus.INITIAL,
  finishedRecruit: false,
  author: otherUser,
};

export const Initial_And_NotCompletedRecruit = {
  name: '신청 안함 + 모집중',
  parameters: {
    ...createMswParameters({
      member: [createMockGetMyInfo(myInfo)],
      recruit: [
        createMockGetRecruitDetail(initialAndNotCompletedRecruitDetail),
        createMockGetRecruitParticipants(
          createMockRecruitParticipants(initialAndNotCompletedRecruitDetail)
        ),
      ],
    }),
  },
};

const initialAndCompletedRecruitDetail: RecruitDetail = {
  ...initialAndNotCompletedRecruitDetail,
  finishedRecruit: true,
};

export const Initial_And_CompletedRecruit = {
  name: '신청 안함 + 모집완료',
  parameters: {
    ...createMswParameters({
      member: [createMockGetMyInfo(myInfo)],
      recruit: [
        createMockGetRecruitDetail(initialAndCompletedRecruitDetail),
        createMockGetRecruitParticipants(
          createMockRecruitParticipants(initialAndCompletedRecruitDetail)
        ),
      ],
    }),
  },
};

const pendingAndNotCompletedRecruitDetail: RecruitDetail = {
  ...initialAndNotCompletedRecruitDetail,
  matchStatus: MatchStatus.PENDING,
};

export const Pending_And_NotCompletedRecruit = {
  name: '응답 대기 + 모집중',
  parameters: {
    ...createMswParameters({
      member: [createMockGetMyInfo(myInfo)],
      recruit: [
        createMockGetRecruitDetail(pendingAndNotCompletedRecruitDetail),
        createMockGetRecruitParticipants(
          createMockRecruitParticipants(pendingAndNotCompletedRecruitDetail)
        ),
      ],
    }),
  },
};

const pendingAndCompletedRecruitDetail: RecruitDetail = {
  ...initialAndCompletedRecruitDetail,
  matchStatus: MatchStatus.PENDING,
};

export const Pending_And_CompletedRecruit = {
  name: '응답 대기 + 모집완료',
  parameters: {
    ...createMswParameters({
      member: [createMockGetMyInfo(myInfo)],
      recruit: [
        createMockGetRecruitDetail(pendingAndCompletedRecruitDetail),
        createMockGetRecruitParticipants(
          createMockRecruitParticipants(pendingAndCompletedRecruitDetail)
        ),
      ],
    }),
  },
};

const rejectedAndNotCompletedRecruitDetail: RecruitDetail = {
  ...initialAndNotCompletedRecruitDetail,
  matchStatus: MatchStatus.REJECTED,
};

export const Rejected_And_NotCompletedRecruit = {
  name: '거절됨 + 모집중',
  parameters: {
    ...createMswParameters({
      member: [createMockGetMyInfo(myInfo)],
      recruit: [
        createMockGetRecruitDetail(rejectedAndNotCompletedRecruitDetail),
        createMockGetRecruitParticipants(
          createMockRecruitParticipants(rejectedAndNotCompletedRecruitDetail)
        ),
      ],
    }),
  },
};

const rejectedAndCompletedRecruitDetail: RecruitDetail = {
  ...initialAndCompletedRecruitDetail,
  matchStatus: MatchStatus.REJECTED,
};

export const Rejected_And_CompletedRecruit = {
  name: '거절됨 + 모집완료',
  parameters: {
    ...createMswParameters({
      member: [createMockGetMyInfo(myInfo)],
      recruit: [
        createMockGetRecruitDetail(rejectedAndCompletedRecruitDetail),
        createMockGetRecruitParticipants(
          createMockRecruitParticipants(rejectedAndCompletedRecruitDetail)
        ),
      ],
    }),
  },
};

const successAndNotCompletedRecruitDetail: RecruitDetail = {
  ...initialAndNotCompletedRecruitDetail,
  matchStatus: MatchStatus.SUCCESS,
};

export const Success_And_NotCompletedRecruit = {
  name: '수락됨 + 모집중',
  parameters: {
    ...createMswParameters({
      member: [createMockGetMyInfo(myInfo)],
      recruit: [
        createMockGetRecruitDetail(successAndNotCompletedRecruitDetail),
        createMockGetRecruitParticipants(
          createMockRecruitParticipants(successAndNotCompletedRecruitDetail)
        ),
      ],
    }),
  },
};

const successAndCompletedRecruitDetail: RecruitDetail = {
  ...initialAndCompletedRecruitDetail,
  matchStatus: MatchStatus.SUCCESS,
};

export const Success_And_CompletedRecruit = {
  name: '수락됨 + 모집완료',
  parameters: {
    ...createMswParameters({
      member: [createMockGetMyInfo(myInfo)],
      recruit: [
        createMockGetRecruitDetail(successAndCompletedRecruitDetail),
        createMockGetRecruitParticipants(
          createMockRecruitParticipants(successAndCompletedRecruitDetail)
        ),
      ],
    }),
  },
};

const emptyContactURLRecruitDetail: RecruitDetail = {
  ...projectDetail,
  contactURI: '',
};

export const EmptyContactURL = {
  name: '연락 URL이 비어있음',
  parameters: {
    ...createMswParameters({
      member: [createMockGetMyInfo(myInfo)],
      recruit: [
        createMockGetRecruitDetail(emptyContactURLRecruitDetail),
        createMockGetRecruitParticipants(
          createMockRecruitParticipants(emptyContactURLRecruitDetail)
        ),
      ],
    }),
  },
};

export const StudyRecruitDetail = {
  name: '스터디 리쿠르팅',
  parameters: {
    ...createMswParameters({
      member: [createMockGetMyInfo(myInfo)],
      recruit: [
        createMockGetRecruitDetail(studyDetail),
        createMockGetRecruitParticipants(
          createMockRecruitParticipants(studyDetail)
        ),
      ],
    }),
  },
};
