import type { SignInApiData, SignInParams } from '~/services/auth';

import { rest } from 'msw';

import {
  issueTokens,
  removeTokens,
  checkRefreshTokenError,
} from '~/mocks/handlers/auth/data';
import { mockError, mockSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const signIn = rest.post<never, never, SignInApiData>(
  composeUrls(API_URL, endpoints.auth.signIn()),
  async (req, res, ctx) => {
    const { oauthName, code } = (await req.json()) as SignInParams;
    console.log('[oauthName]: ', oauthName);
    console.log('[code]: ', code);

    issueTokens();

    return res(ctx.delay(500), ...mockSuccess(ctx, {}));
  }
);

const signOut = rest.post(
  composeUrls(API_URL, endpoints.auth.signOut()),
  (req, res, ctx) => {
    removeTokens();

    return res(...mockSuccess(ctx, {}));
  }
);

const reissueToken = rest.post(
  composeUrls(API_URL, endpoints.auth.refresh()),
  (req, res, ctx) => {
    const error = checkRefreshTokenError();

    if (error) {
      return res(...mockError(ctx, error.code));
    }

    // 토큰이 유효함
    issueTokens();
    return res(...mockSuccess(ctx, {}));
  }
);

export const authHandlers = [signIn, signOut, reissueToken];
