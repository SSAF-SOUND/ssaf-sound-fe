import { rest } from 'msw';

import { paginatedRecruitsHandler } from '~/mocks/handlers/recruit/utils';
import { restError } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getAppliedRecruitsMethod = 'get';
const getAppliedRecruitsEndpoint = composeUrls(
  API_URL,
  endpoints.recruit.appliedListByOffset()
);

export const mockGetAppliedRecruitsByOffset = rest[getAppliedRecruitsMethod](
  getAppliedRecruitsEndpoint,
  paginatedRecruitsHandler(false)
);

export const mockGetAppliedRecruitsByOffsetError = restError(
  getAppliedRecruitsMethod,
  getAppliedRecruitsEndpoint,
  {
    message: 'mockGetAppliedRecruitsByOffset Error',
  }
);

export const emptyRecruits = {
  recruits: [],
  currentPage: 1,
  totalPageCount: 0,
};

export const mockGetEmptyAppliedRecruitsByOffset = rest[
  getAppliedRecruitsMethod
](getAppliedRecruitsEndpoint, paginatedRecruitsHandler(true, 0));
