import type { Meta, StoryObj } from '@storybook/react';

import { PageLayout } from '~/stories/Layout';

import SignInPage from './index';

const meta: Meta<typeof SignInPage> = {
  title: 'Page/SignIn',
  component: SignInPage,
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
};

export default meta;

type SignInPageStory = StoryObj<typeof SignInPage>;

export const Default: SignInPageStory = {};
