import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const updateSsafyBasicInfoMethod = 'patch';
const updateSsafyBasicInfoEndpoint = composeUrls(
  API_URL,
  endpoints.user.ssafyBasicInfo()
);

export const mockUpdateSsafyBasicInfo = restSuccess(
  updateSsafyBasicInfoMethod,
  updateSsafyBasicInfoEndpoint,
  { data: null }
);

export const mockUpdateSsafyBasicInfoError = restError(
  updateSsafyBasicInfoMethod,
  updateSsafyBasicInfoEndpoint,
  {
    message: 'mockUpdateSsafyInfo Error',
  }
);
