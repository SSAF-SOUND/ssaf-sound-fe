import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const removeRecruitEndpoint =
  // eslint-disable-next-line
  // @ts-ignore
  composeUrls(API_URL, endpoints.recruit.detail(':recruitId'));
const removeRecruitMethod = 'delete';

export const mockRemoveRecruit = restSuccess(
  removeRecruitMethod,
  removeRecruitEndpoint,
  { data: null }
);

export const mockRemoveRecruitError = restError(
  removeRecruitMethod,
  removeRecruitEndpoint,
  { message: 'mockRemoveRecruit Error' }
);
