import type {
  GetRecruitDetailApiData,
  RecruitDetail,
} from '~/services/recruit';

import { createMockRecruitDetail } from '~/mocks/handlers/recruit/data';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getRecruitDetailMethod = 'get';
const getRecruitDetailEndpoint = composeUrls(
  API_URL,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  endpoints.recruit.detail('recruitId')
);

export const createMockGetRecruitDetail = (recruitDetail: RecruitDetail) => {
  return restSuccess<GetRecruitDetailApiData['data']>(
    getRecruitDetailMethod,
    getRecruitDetailEndpoint,
    { data: recruitDetail }
  );
};

export const mockGetRecruitDetail = createMockGetRecruitDetail(
  createMockRecruitDetail(1, false)
);

export const mockGetRecruitDetailError = restError(
  getRecruitDetailMethod,
  getRecruitDetailEndpoint,
  {
    message: 'mockCreateRecruit Error',
  }
);
