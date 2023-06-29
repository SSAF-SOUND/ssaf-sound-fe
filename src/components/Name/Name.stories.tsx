import type { Meta, StoryObj } from '@storybook/react';

import Name from './index';

const meta: Meta<typeof Name> = {
  title: 'Name',
  component: Name,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type NameStory = StoryObj<typeof Name>;

export const NameStory: NameStory = {
  name: 'Name',
};
