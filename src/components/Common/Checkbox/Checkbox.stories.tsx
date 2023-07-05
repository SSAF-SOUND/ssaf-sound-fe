import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from './index';

const meta: Meta<typeof Checkbox> = {
  title: 'Checkbox',
  tags: ['autodocs'],
  component: Checkbox,
};

export default meta;

type CheckboxStory = StoryObj<typeof Checkbox>;
export const Default: CheckboxStory = {
  name: 'Checkbox',
  args: {
    size: 32,
    theme: 'primary',
  },
};
