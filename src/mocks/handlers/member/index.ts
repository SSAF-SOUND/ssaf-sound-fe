import type { GetMyInfoApiData, GetMyInfoData } from '~/services/member';

import { rest } from 'msw';

import { mockSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getMyInfo = rest.get<never, never, GetMyInfoApiData>(
  composeUrls(API_URL, endpoints.user.myInfo()),
  (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ...mockSuccess<GetMyInfoData>(ctx, { role: 'user' })
    );
  }
);

export const memberHandlers = [getMyInfo];
