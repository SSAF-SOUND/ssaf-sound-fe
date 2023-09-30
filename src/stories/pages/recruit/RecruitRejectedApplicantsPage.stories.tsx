import type { Meta, StoryObj } from '@storybook/react';
import type { RecruitDetail } from '~/services/recruit';

import { createMockGetMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { mockUserInfo } from '~/mocks/handlers/member/data';
import { createMockGetRecruitDetail } from '~/mocks/handlers/recruit/apis/mockGetRecruitDetail';
import { createMockGetRejectedRecruitApplicants } from '~/mocks/handlers/recruit/apis/mockGetRejectedRecruitApplicants';
import {
  createMockRecruitDetail,
  createMockRejectedRecruitApplicants,
} from '~/mocks/handlers/recruit/data';
import RecruitRejectedApplicantsPage from '~/pages/recruits/[recruitId]/applications/rejected';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const recruitId = 10000;

const myInfo = mockUserInfo.certifiedSsafyUserInfo;
const otherUserInfo = mockUserInfo.uncertifiedSsafyUserInfo;

const projectDetail = createMockRecruitDetail(recruitId, false, {
  completed: false,
  author: myInfo,
  mine: true,
});

const meta: Meta<typeof RecruitRejectedApplicantsPage> = {
  title: 'Page/Recruit/리쿠르팅 거절한 신청서 목록',
  component: RecruitRejectedApplicantsPage,
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
  args: { recruitId },
};

export default meta;

type RecruitRejectedApplicantsPageStory = StoryObj<
  typeof RecruitRejectedApplicantsPage
>;

export const NormalCase: RecruitRejectedApplicantsPageStory = {
  name: '거절한 신청서 목록',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitDetail(projectDetail),

        createMockGetRejectedRecruitApplicants(
          createMockRejectedRecruitApplicants(projectDetail)
        ),
      ],
    }),
  },
};

const notMyProjectDetail: RecruitDetail = {
  ...projectDetail,
  mine: false,
  author: otherUserInfo,
};
export const NotMine: RecruitRejectedApplicantsPageStory = {
  name: '내 리쿠르팅이 아님',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitDetail(notMyProjectDetail),

        createMockGetRejectedRecruitApplicants(
          createMockRejectedRecruitApplicants(notMyProjectDetail)
        ),
      ],
    }),
  },
};

export const Empty: RecruitRejectedApplicantsPageStory = {
  name: '빈 신청서 목록',
  parameters: {
    ...createMswParameters({
      recruit: [
        createMockGetRecruitDetail(projectDetail),
        createMockGetRejectedRecruitApplicants([]),
      ],
    }),
  },
};
