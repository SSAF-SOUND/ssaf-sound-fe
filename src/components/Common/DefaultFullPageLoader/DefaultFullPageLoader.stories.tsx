import type { Meta, StoryObj } from '@storybook/react';

import DefaultFullPageLoader from './index';

const meta: Meta<typeof DefaultFullPageLoader> = {
  title: 'Indicator/DefaultFullPageLoader',
  component: DefaultFullPageLoader,
};

export default meta;

type DefaultFullPageLoaderStory = StoryObj<typeof DefaultFullPageLoader>;
export const Default: DefaultFullPageLoaderStory = {
  args: {
    text: '데이터를 가져오는 중입니다.',
  },
};
