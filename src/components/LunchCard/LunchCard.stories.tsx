import type { LunchCardProps } from './index';
import type { Meta, StoryObj } from '@storybook/react';

import LunchCard from './index';

const meta: Meta<LunchCardProps> = {
  title: 'LunchCard',
  component: LunchCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<LunchCardProps>;

export const Default: Story = {
  args: {
    checked: false,
    place: '3층',
    mainMenu: '돼지갈비',
    extraMenu: '시금치, 계란말이, 아욱국',
  },
};

export const Voted: Story = {
  args: {
    checked: true,
    place: '3층',
    mainMenu: '돼지갈비',
    extraMenu: '시금치, 계란말이, 아욱국',
  },
};
