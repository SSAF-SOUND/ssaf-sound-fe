import type {
  GetMyInfoApiData,
  UpdateMyInfoParams,
  UserInfo,
} from '~/services/member';
import type { ApiErrorResponse } from '~/types';

import { rest } from 'msw';

import { userInfo } from '~/mocks/handlers/member/data';
import { mockError, mockSuccess, restError } from '~/mocks/utils';
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

const updateMyInfo = rest.patch<
  never,
  never,
  GetMyInfoApiData | ApiErrorResponse
>(composeUrls(API_URL, endpoints.user.myInfo()), async (req, res, ctx) => {
  const body = (await req.json()) as UpdateMyInfoParams;

  let response;

  if (body.ssafyMember) {
    response = userInfo.ssafyUserInfo;
  } else {
    response = userInfo.nonSsafyUserInfo;
  }
  response.nickname = body.nickname;

  return res(
    ctx.delay(500),
    ...mockSuccess(ctx, response)
    // ...mockError(ctx, '400'),
  );
});

const validateNickname = rest.post(
  composeUrls(API_URL, endpoints.user.nickname()),
  (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ...mockSuccess(ctx, {})
      // ...mockError(ctx, '400', '닉네임이 중복됩니다.'),
      // ...mockError(ctx, '400', '닉네임의 길이는 1 ~ 11 사이여야 합니다..')
    );
  }
);

export const duplicatedNicknameError = restError(
  'post',
  composeUrls(API_URL, endpoints.user.nickname()),
  {
    message: '닉네임이 중복됩니다',
  }
);

export const memberHandlers = [getMyInfo, updateMyInfo, validateNickname];
