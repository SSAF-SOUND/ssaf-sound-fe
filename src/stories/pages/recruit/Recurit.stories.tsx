import type { Meta, StoryObj } from '@storybook/react';

import RecruitPage from '~/pages/recruits';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof RecruitPage> = {
  title: 'Page/Recruit',
  component: RecruitPage,
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

type RecruitApplyPageStory = StoryObj<typeof RecruitPage>;

export const Default: RecruitApplyPageStory = {};
