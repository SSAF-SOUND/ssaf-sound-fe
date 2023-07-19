import type { Meta, StoryObj } from '@storybook/react';

import SignInButton from './index';

const SignInButtonGroup = () => {
  return (
    <div
      style={{
        maxWidth: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        padding: '60px 0',
        gap: 10,
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
  title: 'Button/SignIn Button',
  component: SignInButtonGroup,
};

export default meta;

type Story = StoryObj<typeof SignInButtonGroup>;

export const Group: Story = {
  args: {
    wide: false,
  },
};
