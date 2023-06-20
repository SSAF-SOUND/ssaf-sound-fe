import type { Meta, StoryObj } from '@storybook/react';

import Dot from './index';

const meta: Meta<typeof Dot> = {
  title: 'Dot',
  component: Dot,
};

export default meta;

type DotStory = StoryObj<typeof Dot>;
export const Default: DotStory = {
  args: {
    size: 'sm',
    theme: 'primary',
  },
};
