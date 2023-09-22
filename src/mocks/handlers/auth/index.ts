import { rest } from 'msw';

import { mockSignIn } from '~/mocks/handlers/auth/apis/mockSignIn';
import {
  issueTokens,
  removeTokens,
  checkRefreshTokenError,
} from '~/mocks/handlers/auth/data';
import { mockError, mockSuccess, restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

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

export const authHandlers = [mockSignIn, signOut, reissueToken, deleteAccount];
