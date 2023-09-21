import type { Meta, StoryObj } from '@storybook/react';

import { mockGetCertifiedSsafyMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import SignInPage from '~/pages/auth/sign-in';
import { PageLayout } from '~/stories/Layout';
import { useResetQueriesEffect } from '~/stories/utils/useResetQueriesEffect';

const meta: Meta<typeof SignInPage> = {
  title: 'Page/SignIn',
  component: SignInPage,
  decorators: [
    (Story) => {
      useResetQueriesEffect();

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

export const NotSignedIn: SignInPageStory = {
  parameters: {
    msw: {
      handlers: {
        member: [mockGetCertifiedSsafyMyInfo],
      },
    },
  },
};

export const SignedIn: SignInPageStory = {
  parameters: {
    msw: {
      handlers: {
        member: [mockGetCertifiedSsafyMyInfo],
      },
    },
  },
};
