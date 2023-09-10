import type { Meta, StoryObj } from '@storybook/react';

import { RecruitCategoryName } from '~/services/recruit';

import { Dday } from './index';

const meta: Meta<typeof Dday> = {
  title: 'Recruit/Dday',
  component: Dday,
  tags: ['autodocs'],
  argTypes: {
    endDate: {
      control: 'date',
    },
  },
};

export default meta;

type DdayStory = StoryObj<typeof Dday>;

export const DdayStory: DdayStory = {
  name: 'Dday',
  args: {
    category: RecruitCategoryName.PROJECT,
    size: 'sm',
    endDate: new Date().toISOString(),
  },
};
