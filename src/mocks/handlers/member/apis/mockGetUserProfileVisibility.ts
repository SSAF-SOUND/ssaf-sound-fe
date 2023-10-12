import type { GetUserProfileVisibilityApiData } from '~/services/member';

import { restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getUserProfileVisibilityMethod = 'get';
const getUserProfileVisibilityEndpoint = // eslint-disable-next-line
  // @ts-ignore
  composeUrls(API_URL, endpoints.user.userProfileVisibility(':id'));

const createMockGetUserProfileVisibility = (isPublic: boolean) => {
  return restSuccess<GetUserProfileVisibilityApiData['data']>(
    getUserProfileVisibilityMethod,
    getUserProfileVisibilityEndpoint,
    { data: { isPublic } }
  );
};

export const mockGetUserProfileVisibility =
  createMockGetUserProfileVisibility(true);
