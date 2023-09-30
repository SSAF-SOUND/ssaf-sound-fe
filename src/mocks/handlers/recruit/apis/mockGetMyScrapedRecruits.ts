import type { GetMyScrapedRecruitsApiData } from '~/services/recruit';

import { rest } from 'msw';

import { restInfiniteRecruitsSuccess } from '~/mocks/handlers/recruit/utils';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls, removeQueryParams } from '~/utils';

const getMyScrapedRecruitsMethod = 'get';

const getMyScrapedRecruitsEndpoint = removeQueryParams(
  composeUrls(API_URL, endpoints.recruit.myScraped())
);

export const mockGetMyScrapedRecruits = rest[getMyScrapedRecruitsMethod](
  getMyScrapedRecruitsEndpoint,
  restInfiniteRecruitsSuccess
);

export const mockGetMyScrapedRecruitsError = restError(
  'get',
  getMyScrapedRecruitsEndpoint,
  {
    message: 'mockGetMyScrapedRecruits Error',
  }
);

const emptyMyScrapedRecruits = {
  isLast: true,
  nextCursor: null,
  recruits: [],
};

export const mockGetEmptyMyScrapedRecruits = restSuccess<
  GetMyScrapedRecruitsApiData['data']
>(getMyScrapedRecruitsMethod, getMyScrapedRecruitsEndpoint, {
  data: emptyMyScrapedRecruits,
});
