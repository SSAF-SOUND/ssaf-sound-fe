import type { Meta, StoryObj } from '@storybook/react';

import RecruitApplyPage from '~/pages/recruits/apply/[id]';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof RecruitApplyPage> = {
  title: 'Page/Recruit/Apply',
  component: RecruitApplyPage,
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
  argTypes: {
    category: {
      options: ['project', 'study'],
      control: { type: 'radio' },
    },
  },
};

export default meta;

type RecruitApplyPageStory = StoryObj<typeof RecruitApplyPage>;

export const Default: RecruitApplyPageStory = {
  args: {
    category: 'project',
  },
};
