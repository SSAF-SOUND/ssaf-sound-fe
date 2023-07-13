import type { Meta, StoryObj } from '@storybook/react';

import { useEffect } from 'react';

import SignInPage from '~/pages/auth/sign-in';
import { getQueryClient, queryKeys } from '~/react-query/common';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof SignInPage> = {
  title: 'Page/SignIn',
  component: SignInPage,
  decorators: [
    (Story) => {
      useEffect(() => {
        getQueryClient().resetQueries(queryKeys.user.myInfo());
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
