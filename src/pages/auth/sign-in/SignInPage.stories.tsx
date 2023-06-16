import type { Meta, StoryObj } from '@storybook/react';

import SignInPage from './index';

const meta: Meta<typeof SignInPage> = {
  title: 'Page/SignInPage',
  component: SignInPage,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 576, border: '1px solid white' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type SignInPageStory = StoryObj<typeof SignInPage>;

export const Default: SignInPageStory = {};
