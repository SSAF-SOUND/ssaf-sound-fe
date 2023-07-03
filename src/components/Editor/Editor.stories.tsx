import type { Meta, StoryObj } from '@storybook/react';

import Editor from './index';

const meta: Meta<typeof Editor> = {
  title: 'Editor',
  component: Editor,
};

export default meta;

type EditorStory = StoryObj<typeof Editor>;
export const Default: EditorStory = {
  args: {},
};
