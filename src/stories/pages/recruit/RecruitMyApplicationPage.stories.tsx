import type { Meta, StoryObj } from '@storybook/react';

import { useQueryClient } from '@tanstack/react-query';

import { userInfo } from '~/mocks/handlers/member/data';
import {
  createMockMyRecruitApplication,
  createMockRecruitDetail,
} from '~/mocks/handlers/recruit/data';
import RecruitMyApplicationPage from '~/pages/recruits/[recruitId]/applications/mine';
import { queryKeys } from '~/react-query/common';
import { useSetMyInfo } from '~/services/member';
import { MatchStatus, RecruitCategoryName } from '~/services/recruit';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof RecruitMyApplicationPage> = {
  title: 'Page/Recruit/MyApplication',
  component: RecruitMyApplicationPage,
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
  matchStatus: MatchStatus.INITIAL,
});
const mockStudyDetail = createMockRecruitDetail(recruitId, true, {
  matchStatus: MatchStatus.INITIAL,
});

const myApplicationQueryKey = queryKeys.recruit.application.mine(recruitId);
const mockProjectMyApplication = createMockMyRecruitApplication(recruitId, {
  category: RecruitCategoryName.PROJECT,
});
const mockStudyMyApplication = createMockMyRecruitApplication(recruitId, {
  category: RecruitCategoryName.STUDY,
});

export default meta;

type RecruitApplicantsStoryArgs = {
  isStudy: boolean;
};

type RecruitMyApplicationPageStory = StoryObj<RecruitApplicantsStoryArgs>;

export const Default: RecruitMyApplicationPageStory = {
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
      isStudy ? mockStudyMyApplication : mockProjectMyApplication
    );

    return <RecruitMyApplicationPage />;
  },
};
