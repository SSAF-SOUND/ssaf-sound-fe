import type { Meta, StoryObj } from '@storybook/react';

import AlertText from './index';

const meta: Meta<typeof AlertText> = {
  title: 'AlertText',
  component: AlertText,
  argTypes: {
    children: {
      name: 'text',
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

type AlertTextStory = StoryObj<typeof AlertText>;
export const Default: AlertTextStory = {
  args: {
    size: 'sm',
    children: 'Alert Text',
    bold: false,
  },
};
