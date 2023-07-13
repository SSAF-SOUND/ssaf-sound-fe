import type { Meta, StoryObj } from '@storybook/react';

import { PageLayout } from '~/stories/Layout';

import RollingAllTracks from './index';

const meta: Meta<typeof RollingAllTracks> = {
  title: 'RollingAllTracks',
  component: RollingAllTracks,
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof RollingAllTracks>;

export const Default: Story = {
  args: {
    gap: 15,
    seconds: 15,
  },
};
