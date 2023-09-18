import type { Meta, StoryObj } from '@storybook/react';

import { useQueryClient } from '@tanstack/react-query';

import { userInfo } from '~/mocks/handlers/member/data';
import {
  createMockRecruitApplicants,
  createMockRecruitDetail,
  createMockRecruitParticipants,
} from '~/mocks/handlers/recruit/data';
import RecruitPendingApplicantsPage from '~/pages/recruits/[recruitId]/applications';
import { queryKeys } from '~/react-query/common';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof RecruitPendingApplicantsPage> = {
  title: 'Page/Recruit/Applicants/Pending',
  component: RecruitPendingApplicantsPage,
  decorators: [
    (Story) => {
      return (
        <PageLayout>
          <Story />
        </PageLayout>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

const recruitId = NaN;
const recruitDetailQueryKey = queryKeys.recruit.detail(recruitId);
const recruitApplicantsQueryKey =
  queryKeys.recruit.application.applicants(recruitId);
const recruitParticipantsQueryKey = queryKeys.recruit.participants(recruitId);

const mockProjectDetail = createMockRecruitDetail(recruitId, false, {
  mine: true,
});
const mockProjectApplicants = createMockRecruitApplicants(recruitId, {
  recruitDetail: mockProjectDetail,
});
const mockProjectParticipants =
  createMockRecruitParticipants(mockProjectDetail);

//
const mockStudyDetail = createMockRecruitDetail(recruitId, true, {
  mine: true,
});
const mockStudyApplicants = createMockRecruitApplicants(recruitId, {
  recruitDetail: mockStudyDetail,
});
const mockStudyParticipants = createMockRecruitParticipants(mockStudyDetail);

export default meta;

type RecruitApplicantsStoryArgs = {
  isStudy: boolean;
};

type RecruitPendingApplicantsPageStory = StoryObj<RecruitApplicantsStoryArgs>;

export const Default: RecruitPendingApplicantsPageStory = {
  args: {
    isStudy: false,
  },
  render: function Render(args) {
    const { isStudy = false } = args;
    const queryClient = useQueryClient();
    const setMyInfo = useSetMyInfo();
    setMyInfo(userInfo.certifiedSsafyUserInfo);
    queryClient.setQueryData(
      recruitDetailQueryKey,
      isStudy ? mockStudyDetail : mockProjectDetail
    );
    queryClient.setQueryData(
      recruitApplicantsQueryKey,
      isStudy ? mockStudyApplicants : mockProjectApplicants
    );
    queryClient.setQueryData(
      recruitParticipantsQueryKey,
      isStudy ? mockStudyParticipants : mockProjectParticipants
    );

    return <RecruitPendingApplicantsPage />;
  },
};
