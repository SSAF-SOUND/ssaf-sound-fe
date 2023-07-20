import type { Meta, StoryObj } from '@storybook/react';

import PortfolioEditPage from '~/pages/profile/portfolio/edit';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof PortfolioEditPage> = {
  title: 'Page/PortfolioEdit',
  component: PortfolioEditPage,
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

type SignInPageStory = StoryObj<typeof PortfolioEditPage>;

export const Default: SignInPageStory = {};
