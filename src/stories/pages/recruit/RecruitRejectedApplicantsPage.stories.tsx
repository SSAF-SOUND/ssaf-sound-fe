import type { Meta, StoryObj } from '@storybook/react';

import RecruitRejectedApplicantsPage from '~/pages/recruits/[recruitId]/applications/rejected';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof RecruitRejectedApplicantsPage> = {
  title: 'Page/Recruit/Applicants/Rejected',
  component: RecruitRejectedApplicantsPage,
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

//

export default meta;

type RecruitRejectedApplicantsPageStory = StoryObj<
  typeof RecruitRejectedApplicantsPage
>;

export const Default: RecruitRejectedApplicantsPageStory = {};
