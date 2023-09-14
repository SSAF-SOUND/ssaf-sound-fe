import type { Meta, StoryObj } from '@storybook/react';

import { TextInput } from './index';

const meta: Meta<typeof TextInput> = {
  title: 'Input/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'radio',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 500 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type TextInputStory = StoryObj<typeof TextInput>;
export const Default: TextInputStory = {
  args: {
    size: 'sm',
    rounded: false,
    placeholder: '입력하세요',
  },
};
