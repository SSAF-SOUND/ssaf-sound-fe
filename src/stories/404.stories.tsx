import type { Meta, StoryObj } from '@storybook/react';

import NotFoundPage from '~/pages/404';
import { PageLayout } from '~/stories/Layout';

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
