import type { Meta, StoryObj } from '@storybook/react';

import { FullPageLoader } from './index';

const meta: Meta<typeof FullPageLoader> = {
  title: 'Indicator/DefaultFullPageLoader',
  component: FullPageLoader,
};

export default meta;

type DefaultFullPageLoaderStory = StoryObj<typeof FullPageLoader>;
export const Default: DefaultFullPageLoaderStory = {
  args: {
    text: '데이터를 가져오는 중입니다.',
  },
};
