import type { Meta, StoryObj } from '@storybook/react';

import Button from './index';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Text: Story = {
  args: {
    children: 'Button',
    variant: 'text',
  },
};

export const Filled: Story = {
  args: {
    children: 'Button',
    variant: 'filled',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Button',
    variant: 'outlined',
  },
};
