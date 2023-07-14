import type { Meta } from '@storybook/react';

import NumberInput from './index';

const meta: Meta<typeof NumberInput> = {
  title: 'Input/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  argTypes: {
    onClickMinus: {
      description:
        '마이너스 버튼을 누를 때 수행할 콜백입니다. 전달하지 않으면 디폴트 콜백이 등록됩니다.',
    },
    onClickPlus: {
      description:
        '플러스 버튼을 누를 때 수행할 콜백입니다. 전달하지 않으면 디폴트 콜백이 등록됩니다.',
    },
  },
};

export default meta;

export const Default = {
  args: {
    onClickMinus: undefined,
    onClickPlus: undefined,
    defaultValue: 0,
  },
};
