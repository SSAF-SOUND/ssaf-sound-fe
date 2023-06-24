import type { Meta, StoryObj } from '@storybook/react';

import { Button, Modal } from '~/components/Common';

import BottomMenu from './index';

const meta: Meta<typeof BottomMenu> = {
  title: 'Modal/Modal Content/BottomMenu',
  component: BottomMenu,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type BottomMenuModalContentStory = StoryObj<typeof BottomMenu>;

export const Default: BottomMenuModalContentStory = {
  args: {},
  render: (args) => {
    return (
      <div>
        <Modal
          trigger={<Button>트리거 버튼</Button>}
          content={<BottomMenu {...args} />}
        />
      </div>
    );
  },
};
