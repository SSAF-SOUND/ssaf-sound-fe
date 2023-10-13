import type { GetProfileVisibilityApiData } from '~/services/member';

import { restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getProfileVisibilityMethod = 'get';
const getProfileVisibilityEndpoint = composeUrls(
  API_URL,
  endpoints.user.profileVisibility()
);

export const createMockGetProfileVisibility = (isPublic: boolean) => {
  return restSuccess<GetProfileVisibilityApiData['data']>(
    getProfileVisibilityMethod,
    getProfileVisibilityEndpoint,
    {
      data: { isPublic },
    }
  );
};

export const mockGetProfileVisibility = createMockGetProfileVisibility(true);
