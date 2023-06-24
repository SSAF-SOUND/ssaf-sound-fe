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
  args: {
    title: 'Menu',
    buttonElements: (
      <>
        <BottomMenu.Button
          onClick={() => {
            console.log('Clicked Button 1');
          }}
        >
          Button 1
        </BottomMenu.Button>
        <BottomMenu.Button
          onClick={() => {
            console.log('Clicked Button 2');
          }}
        >
          Button 2
        </BottomMenu.Button>
      </>
    ),
  },
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
