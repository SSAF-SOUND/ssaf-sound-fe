import type { GetMyInfoApiData, UserInfo } from '~/services/member';
import type { ApiErrorResponse } from '~/types';

import { rest } from 'msw';

import { userInfo } from '~/mocks/handlers/member/data';
import { mockError, mockSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getMyInfo = rest.get<never, never, GetMyInfoApiData | ApiErrorResponse>(
  composeUrls(API_URL, endpoints.user.myInfo()),
  (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ...mockSuccess<UserInfo>(ctx, userInfo.initialUserInfo)
      // ...mockSuccess<UserInfo>(ctx, userInfo.ssafyUserInfo),
      // ...mockSuccess<UserInfo>(ctx, userInfo.nonSsafyUserInfo)
      // ...mockError(ctx, 'code', 'message', 404),
    );
  }
);

export const memberHandlers = [getMyInfo];
