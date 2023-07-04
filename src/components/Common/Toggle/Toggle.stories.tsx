import type { Meta, StoryObj } from '@storybook/react';

import Toggle from './index';

const meta: Meta<typeof Toggle> = {
  title: 'Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    thumbSize: {
      description:
        '`thumb`엘리먼트의 크기입니다. 텍스트 엘리먼트의 높이보다 커야 합니다.',
    },
    textWidth: {
      description: '텍스트 엘리먼트의 `width`. 텍스트는 항상 중앙 정렬됩니다.',
    },
    order: {
      description:
        '`thumb`엘리먼트와 텍스트 엘리먼트의 순서를 바꿀 수 있습니다.',
    },
    pressed: {
      description: '`controlled`로 쓰는 경우에만 사용합니다.',
    },
  },
};

export default meta;

type ToggleStory = StoryObj<typeof Toggle>;
export const Default: ToggleStory = {
  args: {
    thumbSize: 24,
    textWidth: 60,
    order: 'thumb-first',
    theme: 'primary',
    text: 'Text',
    padding: '2px 3px',
  },
};
