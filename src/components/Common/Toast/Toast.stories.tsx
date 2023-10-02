import type { StoryObj, Meta } from '@storybook/react';

import toast, { Toaster } from 'react-hot-toast';

import { Button } from '~/components/Common/Button';
import SuccessToast from '~/components/Common/Toast/SuccessToast';
import { customToast } from '~/utils';

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
export const OnError: ServerErrorToastStory = {
  args: {
    clientMessage: 'Client Error Message',
    serverMessage: 'Server Error Message',
    showServerMessage: true,
  },
  render: (args) => {
    const onClick = () => {
      toast((t) => <ServerErrorToast {...args} t={t} />);
    };

    return (
      <div>
        <Button onClick={onClick}>트리거 버튼</Button>
      </div>
    );
  },
};

type SuccessToastStory = StoryObj<typeof SuccessToast>;

export const OnSuccess: SuccessToastStory = {
  args: {
    message: 'Success',
  },
  render: (args) => {
    const onClick = () => {
      toast((t) => <SuccessToast {...args} t={t} />);
    };

    return (
      <div>
        <Button onClick={onClick}>트리거 버튼</Button>
      </div>
    );
  },
};

interface PromiseToastArgs {
  loadingMessage: string;
  errorMessage: string;
  successMessage: string;
}

type PromiseToastStory = StoryObj<PromiseToastArgs>;

export const OnPromise: PromiseToastStory = {
  args: {
    loadingMessage: '처리중...',
    errorMessage: '실패',
    successMessage: '성공',
  },
  render: (args) => {
    const { loadingMessage, errorMessage, successMessage } = args;
    const messages = {
      loading: loadingMessage,
      error: errorMessage,
      success: successMessage,
    };
    const successPromise = (): Promise<void> =>
      new Promise((resolve) => {
        setTimeout(() => resolve(), 1500);
      });

    const errorPromise = (): Promise<void> =>
      new Promise((resolve, reject) => setTimeout(() => reject(), 1500));

    const handleSuccessPromiseToast = () =>
      customToast.promise(successPromise(), messages);

    const handleErrorPromiseToast = () =>
      customToast.promise(errorPromise(), messages);

    return (
      <>
        <Button onClick={handleSuccessPromiseToast}>성공 트리거 버튼</Button>

        <div css={{ marginBottom: 20 }} />

        <Button onClick={handleErrorPromiseToast}>실패 트리거 버튼</Button>
      </>
    );
  },
};
