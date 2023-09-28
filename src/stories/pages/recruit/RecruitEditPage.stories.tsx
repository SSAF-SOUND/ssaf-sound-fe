import type { Meta } from '@storybook/react';

import { mockGetCertifiedSsafyMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { mockUserInfo } from '~/mocks/handlers/member/data';
import { createMockGetRecruitDetail } from '~/mocks/handlers/recruit/apis/mockGetRecruitDetail';
import { mockUpdateRecruit } from '~/mocks/handlers/recruit/apis/mockUpdateRecruit';
import { createMockRecruitDetail } from '~/mocks/handlers/recruit/data';
import RecruitEditPage from '~/pages/recruits/[recruitId]/edit';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const meta: Meta<typeof RecruitEditPage> = {
  title: 'Page/Recruit/리쿠르팅 수정하기',
  component: RecruitEditPage,
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
    }),
  },
};

export default meta;

const myInfo = mockUserInfo.certifiedSsafyUserInfo;
const projectDetail = createMockRecruitDetail(1, false, {
  mine: true,
  completed: false,
  author: myInfo,
});

export const Project = {
  name: '프로젝트 리쿠르팅 수정',
  parameters: {
    ...createMswParameters({
      recruit: [mockUpdateRecruit, createMockGetRecruitDetail(projectDetail)],
    }),
  },
};

const studyDetail = createMockRecruitDetail(1, true, {
  mine: true,
  completed: false,
  author: myInfo,
});
export const Study = {
  name: '스터디 리쿠르팅 수정',
  parameters: {
    ...createMswParameters({
      recruit: [mockUpdateRecruit, createMockGetRecruitDetail(studyDetail)],
    }),
  },
};

const completedRecruit = createMockRecruitDetail(1, false, {
  completed: true,
  mine: true,
  author: myInfo,
});

export const Completed = {
  name: '완료된 리쿠르팅 수정',
  parameters: {
    ...createMswParameters({
      recruit: [
        mockUpdateRecruit,
        createMockGetRecruitDetail(completedRecruit),
      ],
    }),
  },
};
