import type { ApiSuccessResponse } from '~/types';

import { rest } from 'msw';

import { endpoints } from '~/react-query/common/queryKeys';
import { API_URL, composeUrls } from '~/utils';

interface SignInData {
  accessToken: string;
}

const signIn = rest.post<never, never, ApiSuccessResponse<SignInData>>(
  composeUrls(API_URL, endpoints.auth.signIn()),
  (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.json({
        statusCode: 200,
        data: {
          accessToken: 'accessToken',
        },
        message: '',
      })
    );
  }
);

export const authHandlers = [signIn];
