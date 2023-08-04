import type { Meta, StoryObj } from '@storybook/react';

import { useEffect } from 'react';

import { validateNicknameError } from '~/mocks/handlers';
import { userInfo } from '~/mocks/handlers/member/data';
import UserRegisterPage from '~/pages/auth/register';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof UserRegisterPage> = {
  title: 'Page/UserRegister',
  component: UserRegisterPage,
  decorators: [
    (Story) => {
      const setMyInfo = useSetMyInfo();

      useEffect(() => {
        setMyInfo(userInfo.initialUserInfo);
      }, [setMyInfo]);

      return (
        <PageLayout>
          <Story />
        </PageLayout>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type UserRegisterPageStory = StoryObj<typeof UserRegisterPage>;

export const Success: UserRegisterPageStory = {};

export const NicknameValidationError: UserRegisterPageStory = {
  parameters: {
    msw: {
      handlers: {
        member: [validateNicknameError],
      },
    },
  },
};
