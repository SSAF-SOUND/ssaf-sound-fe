import type { GetMyRecruitApplicationApiData } from '~/services/recruit';

import { createMockMyRecruitApplication } from '~/mocks/handlers/recruit/data';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls, removeQueryParams } from '~/utils';

const getMyRecruitApplicationMethod = 'get';
const getMyRecruitApplicationEndpoint = removeQueryParams(
  // eslint-disable-next-line
  // @ts-ignore
  composeUrls(API_URL, endpoints.recruit.application.mine(':recruitId'))
);

export const createMockGetMyRecruitApplication = (
  myRecruitApplication: GetMyRecruitApplicationApiData['data']
) => {
  return restSuccess<GetMyRecruitApplicationApiData['data']>(
    getMyRecruitApplicationMethod,
    getMyRecruitApplicationEndpoint,
    {
      data: myRecruitApplication,
    }
  );
};

export const mockGetMyRecruitApplication = createMockGetMyRecruitApplication(
  createMockMyRecruitApplication(1, {
    recruitApplicationId: 1,
  })
);

export const mockGetMyRecruitApplicationError = restError(
  getMyRecruitApplicationMethod,
  getMyRecruitApplicationEndpoint,
  { message: '내 신청서 불러오기 오류' }
);
