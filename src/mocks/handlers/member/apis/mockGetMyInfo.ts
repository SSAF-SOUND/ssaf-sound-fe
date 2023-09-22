import type { GetMyInfoApiData } from '~/services/member';

import { mockUserInfo } from '~/mocks/handlers/member/data';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getMyInfoMethod = 'get';
const getMyInfoEndpoint = composeUrls(API_URL, endpoints.user.myInfo());

export const createMockGetMyInfo = (data: GetMyInfoApiData['data'] | null) => {
  return restSuccess<GetMyInfoApiData['data'] | null>(
    getMyInfoMethod,
    getMyInfoEndpoint,
    { data }
  );
};

export const mockGetInitialMyInfo = createMockGetMyInfo(
  mockUserInfo.initialUserInfo
);

export const mockGetNonSsafyMyInfo = createMockGetMyInfo(
  mockUserInfo.nonSsafyUserInfo
);

export const mockGetUncertifiedSsafyMyInfo = createMockGetMyInfo(
  mockUserInfo.uncertifiedSsafyUserInfo
);

export const mockGetCertifiedSsafyMyInfo = createMockGetMyInfo(
  mockUserInfo.certifiedSsafyUserInfo
);

export const mockGetMyInfoError = restError(
  getMyInfoMethod,
  getMyInfoEndpoint,
  { message: 'GetMyInfo Error' }
);
