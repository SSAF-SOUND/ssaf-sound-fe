import type { Meta, StoryObj } from '@storybook/react';

import { useQueryClient } from '@tanstack/react-query';

import { userInfo } from '~/mocks/handlers/member/data';
import {
  createMockRecruitApplication,
  createMockRecruitDetail,
} from '~/mocks/handlers/recruit/data';
import RecruitApplicationPage from '~/pages/recruits/[recruitId]/applications/[recruitApplicationId]';
import { queryKeys } from '~/react-query/common';
import { useSetMyInfo } from '~/services/member';
import { MatchStatus, RecruitCategoryName } from '~/services/recruit';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof RecruitApplicationPage> = {
  title: 'Page/Recruit/Application',
  component: RecruitApplicationPage,
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
const mockProjectDetail = createMockRecruitDetail(recruitId, false, {
  mine: true,
  matchStatus: MatchStatus.INITIAL,
});
const mockStudyDetail = createMockRecruitDetail(recruitId, true, {
  matchStatus: MatchStatus.INITIAL,
  mine: true,
});

const myApplicationQueryKey = queryKeys.recruit.application.mine(recruitId);
const mockProjectApplication = createMockRecruitApplication(recruitId, {
  category: RecruitCategoryName.PROJECT,
});
const mockStudyApplication = createMockRecruitApplication(recruitId, {
  category: RecruitCategoryName.STUDY,
});

export default meta;

type RecruitApplicantsStoryArgs = {
  isStudy: boolean;
};

type RecruitApplicationPageStory = StoryObj<RecruitApplicantsStoryArgs>;

export const Default: RecruitApplicationPageStory = {
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
      myApplicationQueryKey,
      isStudy ? mockStudyApplication : mockProjectApplication
    );

    return <RecruitApplicationPage />;
  },
};
