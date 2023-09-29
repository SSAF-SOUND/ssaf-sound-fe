import type { GetRecruitApplicationApiData } from '~/services/recruit';

import { createMockGetMyRecruitApplication } from '~/mocks/handlers/recruit/apis/mockGetMyRecruitApplication';
import { createMockRecruitApplication } from '~/mocks/handlers/recruit/data';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getRecruitApplicationMethod = 'get';
const getRecruitApplicationEndpoint = composeUrls(
  API_URL,
  // eslint-disable-next-line
  // @ts-ignore
  endpoints.recruit.application.detail(':recruitApplicationId')
);
export const createMockGetRecruitApplication = (
  recruitApplication: GetRecruitApplicationApiData['data']
) =>
  restSuccess<GetRecruitApplicationApiData['data']>(
    getRecruitApplicationMethod,
    getRecruitApplicationEndpoint,
    {
      data: recruitApplication,
    }
  );

export const mockGetRecruitApplication = createMockGetMyRecruitApplication(
  createMockRecruitApplication(1, {
    recruitApplicationId: 1,
  })
);

export const mockGetRecruitApplicationError = restError(
  getRecruitApplicationMethod,
  getRecruitApplicationEndpoint,
  { message: 'mockGetRecruitApplication Error' }
);
