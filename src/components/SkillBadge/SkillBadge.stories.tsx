import type { Meta, StoryObj } from '@storybook/react';

import SkillBadge from './index';

const meta: Meta<typeof SkillBadge> = {
  title: 'SkillBadge',
  component: SkillBadge,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type NameStory = StoryObj<typeof SkillBadge>;

export const NameStory: NameStory = {
  name: 'SkillBadge',
};
