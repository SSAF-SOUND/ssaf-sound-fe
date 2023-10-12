import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const updateProfileVisibilityMethod = 'patch';
const updateProfileVisibilityEndpoint = composeUrls(
  API_URL,
  endpoints.user.profileVisibility()
);

export const mockUpdateProfileVisibility = restSuccess(
  updateProfileVisibilityMethod,
  updateProfileVisibilityEndpoint,
  { data: null }
);

export const mockUpdateProfileVisibilityError = restError(
  updateProfileVisibilityMethod,
  updateProfileVisibilityEndpoint,
  { message: 'mockUpdateProfileVisibility Error' }
);
