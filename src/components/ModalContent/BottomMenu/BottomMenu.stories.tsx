import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '~/components/Common/Button';
import { Modal } from '~/components/Common/Modal';
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
  render: () => {
    return (
      <div>
        <Modal
          trigger={<Button>트리거 버튼</Button>}
          content={
            <BottomMenu
              title="Example1 Menu"
              buttonElements={
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
              }
            />
          }
        />
      </div>
    );
  },
};

export const Example2: BottomMenuModalContentStory = {
  render: () => {
    return (
      <div>
        <Modal
          trigger={<Button>트리거 버튼</Button>}
          content={
            <BottomMenu
              title="Example2 Menu"
              buttonElements={
                <>
                  <Modal
                    trigger={
                      <BottomMenu.Button type="button" bold>
                        Open other modal
                      </BottomMenu.Button>
                    }
                    content={
                      <Alert
                        title="Alert"
                        actionText="Action"
                        cancelText="Cancel"
                      />
                    }
                  />
                  <BottomMenu.CloseButton>Close</BottomMenu.CloseButton>
                </>
              }
            />
          }
        />
      </div>
    );
  },
};
