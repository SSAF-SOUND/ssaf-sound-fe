import type { Meta, StoryObj } from '@storybook/react';

import { getMyInfo } from '~/mocks/handlers';
import {
  mockGetCertifiedSsafyMyInfo,
  mockGetMyInfoError,
} from '~/mocks/handlers/member/apis/mockGetMyInfo';
import SignInPage from '~/pages/auth/sign-in';
import { PageLayout } from '~/stories/Layout';
import { useResetQueriesEffect } from '~/stories/utils/useResetQueriesEffect';

const meta: Meta<typeof SignInPage> = {
  title: 'Page/Sign In',
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
        member: [mockGetMyInfoError],
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
