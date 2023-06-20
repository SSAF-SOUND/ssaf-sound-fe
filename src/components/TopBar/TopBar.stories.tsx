import type { Meta, StoryObj } from '@storybook/react';

import { PageLayout } from '~/stories/Layout';

import TopBar from './index';

const meta: Meta<typeof TopBar> = {
  title: 'TopBar',
  component: TopBar,
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TopBar>;

export const Default: Story = {
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },
};
