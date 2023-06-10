import type { SignInApiData } from '~/services/auth';

import { rest } from 'msw';

import { endpoints } from '~/react-query/common/queryKeys';
import { API_URL, composeUrls } from '~/utils';

const COOKIE_VALUE = '.';

const signIn = rest.post<never, never, SignInApiData>(
  composeUrls(API_URL, endpoints.auth.signIn()),
  (req, res, ctx) => {
    return res(
      ctx.cookie('accesstoken', COOKIE_VALUE, {}),
      ctx.cookie('refreshtoken', COOKIE_VALUE, {
        path: '/auth/reissue',
      }),
      ctx.delay(500),
      ctx.status(200),
      ctx.json({
        statusCode: 200,
        data: {},
        message: '',
      })
    );
  }
);

export const authHandlers = [signIn];
