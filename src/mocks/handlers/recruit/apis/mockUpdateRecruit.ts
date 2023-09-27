import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const updateRecruitMethod = 'patch';
const updateRecruitEndpoint = composeUrls(
  API_URL,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  endpoints.recruit.detail(':recruitId')
);

export const createMockUpdateRecruit = () => {
  return restSuccess(updateRecruitMethod, updateRecruitEndpoint);
};

export const mockUpdateRecruit = createMockUpdateRecruit();

export const mockUpdateRecruitError = restError(
  updateRecruitMethod,
  updateRecruitEndpoint,
  {
    message: 'mockUpdateRecruit Error',
  }
);
