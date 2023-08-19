import type { Meta, StoryObj } from '@storybook/react';
import RecruitDetailPage from '~/pages/recruit/[id]';

import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof RecruitDetailPage> = {
  title: 'Page/Recruit/detail',
  component: RecruitDetailPage,
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
  argTypes: {},
};

export default meta;

type RecruitApplyPageStory = StoryObj<typeof RecruitDetailPage>;

export const Default: RecruitApplyPageStory = {
  args: {},
};
