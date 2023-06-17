import type { Meta, StoryObj } from '@storybook/react';

import { PageLayout } from '~/stories/Layout';

import NotFoundPage from './index';

const meta: Meta<typeof NotFoundPage> = {
  title: 'Page/404',
  component: NotFoundPage,
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
};

export default meta;

type SignInPageStory = StoryObj<typeof NotFoundPage>;

export const Default: SignInPageStory = {};
