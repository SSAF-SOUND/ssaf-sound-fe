import type { SignInApiData, SignInParams } from '~/services/auth';

import { rest } from 'msw';

import {
  issueTokens,
  removeTokens,
  checkRefreshTokenError,
} from '~/mocks/handlers/auth/data';
import { mockError, mockSuccess, restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const signIn = rest.post<never, never, SignInApiData>(
  composeUrls(API_URL, endpoints.auth.signIn()),
  async (req, res, ctx) => {
    const { oauthName, code } = (await req.json()) as SignInParams;
    console.log('[oauthName]: ', oauthName);
    console.log('[code]: ', code);

    issueTokens();

    return res(
      ctx.delay(500),
      ...mockSuccess(ctx, {
        accessToken: '5aa41b81-7551-4fa5-842f-0d7063b5340d',
        refreshToken: 'f58c0fee-1799-4635-8ad9-193f9c5ef08c',
      })
    );
  }
);

const signOut = rest.delete(
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

export const deleteAccount = restSuccess(
  'delete',
  composeUrls(API_URL, endpoints.user.myInfo()),
  {
    data: null,
  }
);

export const deleteAccountError = restError(
  'delete',
  composeUrls(API_URL, endpoints.user.myInfo()),
  {
    message: '에러가 발생했습니다.',
  }
);

export const authHandlers = [signIn, signOut, reissueToken, deleteAccount];
