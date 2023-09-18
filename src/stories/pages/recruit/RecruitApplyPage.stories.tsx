import type { Meta, StoryObj } from '@storybook/react';

import { useQueryClient } from '@tanstack/react-query';

import { userInfo } from '~/mocks/handlers/member/data';
import { createMockRecruitDetail } from '~/mocks/handlers/recruit/data';
import RecruitApplyPage from '~/pages/recruits/[recruitId]/apply';
import { queryKeys } from '~/react-query/common';
import { useSetMyInfo } from '~/services/member';
import { MatchStatus } from '~/services/recruit';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof RecruitApplyPage> = {
  title: 'Page/Recruit/Apply',
  component: RecruitApplyPage,
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

export default meta;

type RecruitApplicantsStoryArgs = {
  isStudy: boolean;
};

type RecruitApplyPageStory = StoryObj<RecruitApplicantsStoryArgs>;

export const Default: RecruitApplyPageStory = {
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

    return <RecruitApplyPage />;
  },
};
