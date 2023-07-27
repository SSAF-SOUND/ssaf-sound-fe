import type { StoryObj, Meta } from '@storybook/react';

import toast, { Toaster } from 'react-hot-toast';

import { Button } from '~/components/Common';
import SuccessToast from '~/components/Common/Toast/SuccessToast';

import ServerErrorToast from './ServerErrorToast';

const meta: Meta = {
  title: 'System/Toast',
  decorators: [
    (Story) => {
      return (
        <>
          <Toaster />
          <Story />
        </>
      );
    },
  ],
};
export default meta;

type ServerErrorToastStory = StoryObj<typeof ServerErrorToast>;
export const ServerError: ServerErrorToastStory = {
  args: {
    clientMessage: 'Client Error Message',
    serverMessage: 'Server Error Message',
    showServerMessage: true,
  },
  render: (args) => {
    const { t: _, ...rest } = args;

    const onClick = () => {
      toast((t) => <ServerErrorToast t={t} {...rest} />);
    };

    return (
      <div>
        <Button onClick={onClick}>트리거 버튼</Button>
      </div>
    );
  },
};

type SuccessToastStory = StoryObj<typeof SuccessToast>;

export const Success: SuccessToastStory = {
  args: {
    message: 'Success',
  },
  render: (args) => {
    const { t: _, ...rest } = args;

    const onClick = () => {
      toast((t) => <SuccessToast t={t} {...rest} />);
    };

    return (
      <div>
        <Button onClick={onClick}>트리거 버튼</Button>
      </div>
    );
  },
};
