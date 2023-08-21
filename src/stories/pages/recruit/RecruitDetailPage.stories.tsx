import type { Meta, StoryObj } from '@storybook/react';
import { ComponentType } from 'react';

import RecruitDetailPage from '~/pages/recruit/[id]';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof RecruitDetailPage> = {
  title: 'Page/Recruit/detail',
  component: RecruitDetailPage as ComponentType<any>,
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

type RecruitApplyPageStory = StoryObj<typeof RecruitDetailPage>;

export const Default: RecruitApplyPageStory = {};
