import type { ApiSuccessResponse } from '~/types';

import { rest } from 'msw';

import { endpoints } from '~/react-query/common/queryKeys';

interface SignInData {
  accessToken: string;
}

const signIn = rest.post<never, never, ApiSuccessResponse<SignInData>>(
  endpoints.auth.signIn(),
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
