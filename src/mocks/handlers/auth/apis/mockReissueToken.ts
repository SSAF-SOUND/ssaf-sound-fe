import { rest } from 'msw';

import {
  checkRefreshTokenError,
  issueTokens,
} from '~/mocks/handlers/auth/data';
import { mockError, mockSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const reissueTokenMethod = 'post';
const reissueTokenEndpoint = composeUrls(API_URL, endpoints.auth.refresh());

export const mockReissueToken = rest[reissueTokenMethod](
  reissueTokenEndpoint,
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
