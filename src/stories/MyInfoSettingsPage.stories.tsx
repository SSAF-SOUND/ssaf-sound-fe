import type { Meta, StoryObj } from '@storybook/react';

import MyInfoSettingsPage from '~/pages/profile/myinfo-settings';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof MyInfoSettingsPage> = {
  title: 'Page/MyInfoSettings',
  component: MyInfoSettingsPage,
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

type MyInfoSettingsPageStory = StoryObj<typeof MyInfoSettingsPage>;

export const Default: MyInfoSettingsPageStory = {};
