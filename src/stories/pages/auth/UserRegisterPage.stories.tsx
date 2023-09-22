import type { Meta, StoryObj } from '@storybook/react';

import { useEffect } from 'react';

import { updateMyInfo } from '~/mocks/handlers';
import {
  createMockValidateNickname,
  mockValidateNickname,
} from '~/mocks/handlers/member/apis/mockValidateNickname';
import { userInfo } from '~/mocks/handlers/member/data';
import UserRegisterPage from '~/pages/auth/register';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof UserRegisterPage> = {
  title: 'Page/Auth/User Register',
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

export const Success: UserRegisterPageStory = {
  parameters: {
    msw: {
      handlers: {
        member: [createMockValidateNickname(true), updateMyInfo],
      },
    },
  },
};

export const DuplicatedNickname: UserRegisterPageStory = {
  parameters: {
    msw: {
      handlers: {
        member: [createMockValidateNickname(false)],
      },
    },
  },
};

export const NicknameValidationError: UserRegisterPageStory = {
  parameters: {
    msw: {
      handlers: {
        member: [mockValidateNickname],
      },
    },
  },
};
