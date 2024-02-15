import { waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';

import {
  mockSignIn,
  mockSignInError,
} from '~/mocks/handlers/auth/apis/mockSignIn';
import { server } from '~/mocks/server';
import CallbackPage, { ParamsKey } from '~/pages/auth/callback/[provider]';
import { OAuthProviders } from '~/services/auth/utils';
import { customRender } from '~/test-utils';
import { createMockMatchMedia } from '~/test-utils/matchMedia.mock';
import { routes } from '~/utils';

const OAUTH_PROVIDER = OAuthProviders.GOOGLE;
const CODE = '127';

createMockMatchMedia();

describe('Callback Page', () => {
  it('로그인에 성공하면 메인(`/`) 페이지로 리다이렉션 된다.', async () => {
    server.use(mockSignIn);

    await mockRouter.push({
      pathname: routes.auth.callback(OAUTH_PROVIDER).pathname,
      query: {
        [ParamsKey.CODE]: CODE,
      },
    });

    customRender(<CallbackPage provider={OAUTH_PROVIDER} />);

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        pathname: routes.main(),
      });
    });
  });

  it('로그인에 실패하면 로그인 페이지로 리다이렉션 된다.', async () => {
    server.use(mockSignInError);

    await mockRouter.push({
      pathname: routes.auth.callback(OAUTH_PROVIDER).pathname,
      query: {
        [ParamsKey.CODE]: CODE,
      },
    });

    customRender(<CallbackPage provider={OAUTH_PROVIDER} />);

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        pathname: routes.auth.signIn().pathname,
      });
    });
  });
});
