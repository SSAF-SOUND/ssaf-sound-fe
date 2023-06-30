import type { Meta, StoryObj } from '@storybook/react';

import ProjectInfo from './index';

const meta: Meta<typeof ProjectInfo> = {
  title: 'ProjectInfo',
  component: ProjectInfo,
  tags: ['autodocs'],
  argTypes: {
    recruitStart: {
      control: 'date',
    },
    recruitEnd: {
      control: 'date',
    },
  },
};

export default meta;

type ProjectInfoStory = StoryObj<typeof ProjectInfo>;

export const ProjectInfoStory: ProjectInfoStory = {
  name: 'ProjectInfo',
  args: {},
};
