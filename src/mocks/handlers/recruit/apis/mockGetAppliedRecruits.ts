import type { GetAppliedRecruitsApiData } from '~/services/recruit';

import { rest } from 'msw';

import { restInfiniteAppliedRecruitsSuccess } from '~/mocks/handlers/recruit/utils';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getAppliedRecruitsMethod = 'get';
const getAppliedRecruitsEndpoint = composeUrls(
  API_URL,
  endpoints.recruit.appliedList()
);

export const mockGetAppliedRecruits = rest[getAppliedRecruitsMethod](
  getAppliedRecruitsEndpoint,
  restInfiniteAppliedRecruitsSuccess
);

export const mockGetAppliedRecruitsError = restError(
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

export const mockGetEmptyAppliedRecruits = restSuccess<
  GetAppliedRecruitsApiData['data']
>(getAppliedRecruitsMethod, getAppliedRecruitsEndpoint, {
  data: emptyRecruits,
});
