import type { Meta, StoryObj } from '@storybook/react';

import LogoCharacter from './LogoCharacter';

const meta: Meta<typeof LogoCharacter> = {
  title: 'Icon/SSAFY/Logo',
  component: LogoCharacter,
};

export default meta;

type LogoCharacterIconStory = StoryObj<typeof LogoCharacter>;

export const LogoCharacterIcon: LogoCharacterIconStory = {
  argTypes: {
    size: {
      table: {
        disable: true,
      },
    },
    style: {
      table: {
        disable: true,
      },
    },
  },
};
