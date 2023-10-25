import type { GetUserInfo, UserInfo } from '~/services/member';

import { mockUserInfo } from '~/mocks/handlers/member/data';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getUserInfoMethod = 'get';
const getUserInfoEndpoint = composeUrls(
  API_URL,
  // eslint-disable-next-line
  // @ts-ignore
  endpoints.user.userInfo(':id')
);

export const createMockGetUserInfo = (data: UserInfo) => {
  return restSuccess<GetUserInfo['data']>(
    getUserInfoMethod,
    getUserInfoEndpoint,
    { data }
  );
};

export const mockGetCertifiedUserInfo = createMockGetUserInfo(
  mockUserInfo.certifiedSsafyUserInfo
);

export const mockGetUncertifiedUserInfo = createMockGetUserInfo(
  mockUserInfo.uncertifiedSsafyUserInfo
);

export const mockGetInitialUserInfo = createMockGetUserInfo(
  mockUserInfo.initialUserInfo
);

export const mockGetNonSsafyUserInfo = createMockGetUserInfo(
  mockUserInfo.nonSsafyUserInfo
);

export const mockGetDeletedUserInfo = createMockGetUserInfo(
  mockUserInfo.deletedUserInfo
);

export const mockGetUserInfoError = restError(
  getUserInfoMethod,
  getUserInfoEndpoint,
  { message: 'GetUserInfo Error' }
);
