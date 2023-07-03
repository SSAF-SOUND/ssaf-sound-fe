import type { Meta, StoryObj } from '@storybook/react';

import DatePicker from './index';

const meta: Meta<typeof DatePicker> = {
  title: 'DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type ButtonStory = StoryObj<typeof DatePicker>;

export const SingleButton: ButtonStory = {
  name: 'DatePicker',
  args: {
    theme: 'primary',
  },
};
