import type { Meta, StoryObj } from '@storybook/react';

import { useEffect } from 'react';

import SignInPage from '~/pages/auth/sign-in';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof SignInPage> = {
  title: 'Page/SignIn',
  component: SignInPage,
  decorators: [
    (Story) => {
      const setMyInfo = useSetMyInfo();
      useEffect(() => {
        setMyInfo(undefined);
      }, []);
      return (
        <PageLayout>
          <Story />
        </PageLayout>
      );
    },
  ],
};

export default meta;

type SignInPageStory = StoryObj<typeof SignInPage>;

export const Default: SignInPageStory = {};
