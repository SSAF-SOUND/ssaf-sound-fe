import type { Meta, StoryObj } from '@storybook/react';

import { expect } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';

import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('클릭', async () => {
      await userEvent.click(
        canvas.getByRole('button', {
          name: 'Button',
        })
      );
    });

    await step('더블클릭', async () => {
      await userEvent.dblClick(
        canvas.getByRole('button', {
          name: 'Button',
        })
      );
    });

    await step('assertion', () => {
      expect(
        canvas.queryByRole('button', {
          name: 'Not Exists Button',
        })
      ).not.toBeInTheDocument();
    });
  },
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};
