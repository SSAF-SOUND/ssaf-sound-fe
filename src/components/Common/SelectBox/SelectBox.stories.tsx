import type { Meta, StoryObj } from '@storybook/react';

import { SelectBox } from './index';

const meta: Meta<typeof SelectBox> = {
  title: 'Input/SelectBox',
  component: SelectBox,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 500 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SelectBox>;

export const FewItems: Story = {
  args: {
    items: Array(5)
      .fill(undefined)
      .map((_, i) => `Item${i}`),
    placeholder: '',
    size: 'lg',
    triggerTextAlign: 'center',
    itemTextAlign: 'center',
    theme: 'primary',
    variant: 'normal',
  },
};

export const ManyItems: Story = {
  args: {
    items: Array(50)
      .fill(undefined)
      .map((_, i) => `Item${i}`),
    placeholder: '',
    size: 'lg',
    triggerTextAlign: 'center',
    itemTextAlign: 'center',
    theme: 'primary',
    variant: 'normal',
  },
};
