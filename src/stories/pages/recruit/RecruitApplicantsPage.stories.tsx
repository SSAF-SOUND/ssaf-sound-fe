import type { Meta, StoryObj } from '@storybook/react';

import RecruitApplicantsPage from '~/pages/recruits/[id]/applicants';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof RecruitApplicantsPage> = {
  title: 'Page/Recruit/Applicants',
  component: RecruitApplicantsPage,
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type RecruitApplicantsPageStory = StoryObj<typeof RecruitApplicantsPage>;

export const Success: RecruitApplicantsPageStory = {};
