import type { Meta, StoryObj } from '@storybook/react';

import { expect } from '@storybook/jest';
import { waitForElementToBeRemoved, within } from '@storybook/testing-library';

import { loaderText } from '~/components/Common';
import {
  mockGetCertifiedSsafyMyInfo,
  mockGetMyInfoError,
} from '~/mocks/handlers/member/apis/mockGetMyInfo';
import SignInPage from '~/pages/auth/sign-in';
import { PageLayout } from '~/stories/Layout';
import {
  createMockRouterMethods,
  getMockRouter,
} from '~/stories/utils/mockRouter';
import { useAutoSignOut } from '~/stories/utils/useAutoSignOut';
import { routes, sleep, toMs } from '~/utils';

const meta: Meta<typeof SignInPage> = {
  title: 'Page/Auth/Sign In',
  component: SignInPage,
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
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
  decorators: [
    (Story) => {
      useAutoSignOut();
      return <Story />;
    },
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await waitForElementToBeRemoved(canvas.getByText(loaderText.checkUser), {
      timeout: 5000,
    });

    await step(
      'Google, GitHub, Kakao, Apple 로그인 버튼이 보인다.',
      async () => {
        const allSignInLinks = await canvas.findAllByText(
          /(google|github|kakao|apple) 로그인/i
        );
        await expect(allSignInLinks).toHaveLength(4);
      }
    );

    await step('메인 페이지 링크가 보인다.', () => {
      const toMainPageLink = canvas.getByRole('link', {
        name: /메인페이지/,
      });
      expect(toMainPageLink).toHaveAttribute('href', routes.main());
    });
  },
};

export const SignedIn: SignInPageStory = {
  parameters: {
    msw: {
      handlers: {
        member: [mockGetCertifiedSsafyMyInfo],
      },
    },
    nextjs: {
      router: createMockRouterMethods(),
    },
  },
  play: async ({ parameters, step }) => {
    const router = getMockRouter(parameters);
    await sleep(toMs(1));

    step('로그인 상태라면 메인 페이지로 리다이렉션된다', () => {
      expect(router.replace).toBeCalledWith(routes.main());
    });
  },
};
