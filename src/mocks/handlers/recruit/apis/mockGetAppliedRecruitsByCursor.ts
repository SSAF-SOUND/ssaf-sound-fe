import type { GetAppliedRecruitsByCursorApiData } from '~/services/recruit';

import { rest } from 'msw';

import { restInfiniteAppliedRecruitsSuccess } from '~/mocks/handlers/recruit/utils';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getAppliedRecruitsMethod = 'get';
const getAppliedRecruitsEndpoint = composeUrls(
  API_URL,
  endpoints.recruit.appliedListByCursor()
);

export const mockGetAppliedRecruitsByCursor = rest[getAppliedRecruitsMethod](
  getAppliedRecruitsEndpoint,
  restInfiniteAppliedRecruitsSuccess
);

export const mockGetAppliedRecruitsByCursorError = restError(
  getAppliedRecruitsMethod,
  getAppliedRecruitsEndpoint,
  {
    message: 'mockGetAppliedRecruits Error',
  }
);

export const emptyRecruits = {
  recruits: [],
  nextCursor: null,
  isLast: true,
};

export const mockGetEmptyAppliedRecruitsByCursor = restSuccess<
  GetAppliedRecruitsByCursorApiData['data']
>(getAppliedRecruitsMethod, getAppliedRecruitsEndpoint, {
  data: emptyRecruits,
});
