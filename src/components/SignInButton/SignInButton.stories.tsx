import type { Meta, StoryObj } from '@storybook/react';

import SignInButton from './index';

const SignInButtonGroup = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        gap: 10,
        padding: 30,
        width: 350,
      }}
    >
      <SignInButton.Google />
      <SignInButton.GitHub />
      <SignInButton.Kakao />
      <SignInButton.Apple />
    </div>
  );
};

const meta: Meta<typeof SignInButtonGroup> = {
  title: 'SignIn Button',
  component: SignInButtonGroup,
};

export default meta;

type Story = StoryObj<typeof SignInButtonGroup>;

export const Group: Story = {
  args: {
    wide: false,
  },
};
