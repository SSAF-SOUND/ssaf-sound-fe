import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const updateIsMajorMethod = 'patch';
const updateIsMajorEndpoint = composeUrls(API_URL, endpoints.user.isMajor());

export const mockUpdateIsMajor = restSuccess(
  updateIsMajorMethod,
  updateIsMajorEndpoint
);

export const mockUpdateIsMajorError = restError(
  updateIsMajorMethod,
  updateIsMajorEndpoint,
  {
    message: 'mockUpdateIsMajor Error',
  }
);
