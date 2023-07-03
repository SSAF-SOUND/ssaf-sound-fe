import type { Meta, StoryObj } from '@storybook/react';

import Dday from './index';

const meta: Meta<typeof Dday> = {
  title: 'Dday',
  component: Dday,
  tags: ['autodocs'],
  argTypes: {
    recruitEnd: {
      control: 'date',
    },
  },
};

export default meta;

type DdayStory = StoryObj<typeof Dday>;

export const DdayStory: DdayStory = {
  name: 'Dday',
  args: {},
};
