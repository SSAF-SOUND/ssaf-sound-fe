import type { Meta, StoryObj } from '@storybook/react';

import Gnb from './index';

const meta: Meta<typeof Gnb> = {
  title: 'Navigation/Gnb',
  component: Gnb,
};

export default meta;

type GnbStory = StoryObj<typeof Gnb>;

export const Default: GnbStory = {};
