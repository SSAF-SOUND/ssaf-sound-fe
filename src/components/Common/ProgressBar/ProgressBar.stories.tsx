import type { Meta, StoryObj } from '@storybook/react';

import ProgressBar from './index';

const meta: Meta<typeof ProgressBar> = {
  title: 'Indicator/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ fontSize: 12, width: '70%', color: 'white' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const WithoutLabel: Story = {
  args: {
    min: 0,
    now: 50,
    max: 100,
  },
};

export const WithLabel: Story = {
  args: {
    min: 0,
    now: 50,
    max: 100,
    label: '50%',
  },
};
