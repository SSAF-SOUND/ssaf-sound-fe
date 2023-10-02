import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '~/components/Common/Button';
import { Modal } from '~/components/Common/Modal';

import Alert from './index';

const meta: Meta<typeof Alert> = {
  title: 'Modal/Modal Content/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
  },
};

export default meta;

type AlertModalContentStory = StoryObj<typeof Alert>;

export const Default: AlertModalContentStory = {
  args: {
    title: 'Title',
    description: 'Description',
    actionText: 'Action',
    cancelText: 'Cancel',
    onClickAction: () => {},
    onClickCancel: () => {},
  },
  render: (args) => {
    return (
      <div>
        <Modal
          trigger={<Button>트리거 버튼</Button>}
          content={<Alert {...args} />}
        />
      </div>
    );
  },
};
