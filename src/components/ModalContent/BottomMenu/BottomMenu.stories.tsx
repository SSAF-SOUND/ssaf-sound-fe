import type { Meta, StoryObj } from '@storybook/react';

import { Button, Modal } from '~/components/Common';
import { Alert } from '~/components/ModalContent';

import BottomMenu from './index';

const meta: Meta<typeof BottomMenu> = {
  title: 'Modal/Modal Content/BottomMenu',
  component: BottomMenu,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type BottomMenuModalContentStory = StoryObj<typeof BottomMenu>;

export const Example1: BottomMenuModalContentStory = {
  args: {
    title: 'Example1 Menu',
    buttonElements: (
      <>
        <BottomMenu.CloseButton
          onClick={() => {
            console.log('Button1 Clicked');
          }}
        >
          Button 1
        </BottomMenu.CloseButton>
        <BottomMenu.CloseButton
          onClick={() => {
            console.log('Button2 Clicked');
          }}
        >
          Button 2
        </BottomMenu.CloseButton>
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

export const Example2: BottomMenuModalContentStory = {
  args: {
    title: 'Example2 Menu',
    buttonElements: (
      <>
        <Modal
          trigger={
            <BottomMenu.Button type="button" bold>
              Open Other Modal
            </BottomMenu.Button>
          }
          content={
            <Alert
              title="Alert Modal"
              actionText="action"
              cancelText="cancel"
            />
          }
        />
        <BottomMenu.CloseButton>Close</BottomMenu.CloseButton>
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
