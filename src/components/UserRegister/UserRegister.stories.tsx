import type { Meta, StoryObj } from '@storybook/react';

import { MainLayout } from '~/components/Layout';

import UserRegister from './index';

const meta: Meta<typeof UserRegister> = {
  title: 'User Register',
  component: UserRegister,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MainLayout
        css={{
          maxWidth: 500,
        }}
      >
        <Story />
      </MainLayout>
    ),
  ],
  argTypes: {
    defaultPhase: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof UserRegister>;

export const Phase1: Story = {
  args: {
    defaultPhase: 0,
  },
};

export const Phase2: Story = {
  args: {
    defaultPhase: 1,
  },
};

export const Phase3: Story = {
  args: {
    defaultPhase: 2,
  },
};

export const Phase4: Story = {
  args: {
    defaultPhase: 3,
  },
};

export const Phase5: Story = {
  args: {
    defaultPhase: 4,
  },
};
