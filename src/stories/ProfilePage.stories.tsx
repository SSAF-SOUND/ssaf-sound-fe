import type { Meta, StoryObj } from '@storybook/react';

import NavigationGroup from '~/components/NavigationGroup';
import ProfilePage from '~/pages/profile/[id]';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof ProfilePage> = {
  title: 'Page/Profile',
  component: ProfilePage,
  decorators: [
    (Story) => (
      <PageLayout>
        <NavigationGroup />
        <Story />
      </PageLayout>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type SignInPageStory = StoryObj<typeof ProfilePage>;

export const Default: SignInPageStory = {};
