import type { Meta, StoryObj } from '@storybook/react';

import { duplicatedNicknameError } from '~/mocks/handlers';
import UserRegisterPage from '~/pages/auth/register';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof UserRegisterPage> = {
  title: 'Page/UserRegister',
  component: UserRegisterPage,
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
};

export default meta;

type UserRegisterPageStory = StoryObj<typeof UserRegisterPage>;

export const Success: UserRegisterPageStory = {};

export const DuplicatedNicknameError: UserRegisterPageStory = {
  parameters: {
    msw: {
      handlers: {
        member: [duplicatedNicknameError],
      },
    },
  },
};
