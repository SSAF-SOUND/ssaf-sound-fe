import type { Meta, StoryObj } from '@storybook/react';

import { SkillName } from '~/services/recruit';

import SkillBadge from './index';

const meta: Meta<typeof SkillBadge> = {
  title: 'Input/SkillBadge',
  component: SkillBadge,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type NameStory = StoryObj<typeof SkillBadge>;

export const Default: NameStory = {
  args: {
    name: SkillName.REACT,
  },
};
