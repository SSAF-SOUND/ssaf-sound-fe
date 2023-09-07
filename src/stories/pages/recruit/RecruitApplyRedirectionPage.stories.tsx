import type { Meta, StoryObj } from '@storybook/react';

import RecruitRedirectionPage from '~/pages/recruits/apply/redirect';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof RecruitRedirectionPage> = {
  title: 'Page/Recruit/ApplyRedirection',
  component: RecruitRedirectionPage,
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

type RecruitRedirectionPageStory = StoryObj<typeof RecruitRedirectionPage>;

export const Default: RecruitRedirectionPageStory = {};
