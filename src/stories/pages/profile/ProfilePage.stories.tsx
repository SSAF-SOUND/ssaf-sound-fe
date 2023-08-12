import type { Meta, StoryObj } from '@storybook/react';

import ProfilePage from '~/pages/profile/[id]';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof ProfilePage> = {
  title: 'Page/Profile/Root',
  component: ProfilePage,
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

type ProfilePageStory = StoryObj<typeof ProfilePage>;

export const Default: ProfilePageStory = {};
