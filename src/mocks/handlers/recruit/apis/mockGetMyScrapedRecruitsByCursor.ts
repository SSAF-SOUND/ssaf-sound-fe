import type { GetMyScrapedRecruitsByCursorApiData } from '~/services/recruit';

import { rest } from 'msw';

import { restInfiniteRecruitsSuccess } from '~/mocks/handlers/recruit/utils';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getMyScrapedRecruitsMethod = 'get';

const getMyScrapedRecruitsEndpoint = composeUrls(
  API_URL,
  endpoints.recruit.myScrapsByCursor()
);

export const mockGetMyScrapedRecruitsByCursor = rest[
  getMyScrapedRecruitsMethod
](getMyScrapedRecruitsEndpoint, restInfiniteRecruitsSuccess);

export const mockGetMyScrapedRecruitsByCursorError = restError(
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

export const mockGetEmptyMyScrapedRecruitsByCursor = restSuccess<
  GetMyScrapedRecruitsByCursorApiData['data']
>(getMyScrapedRecruitsMethod, getMyScrapedRecruitsEndpoint, {
  data: emptyMyScrapedRecruits,
});
