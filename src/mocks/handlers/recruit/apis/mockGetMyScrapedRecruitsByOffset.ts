import { rest } from 'msw';

import { paginatedRecruitsHandler } from '~/mocks/handlers/recruit/utils';
import { restError } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getMyScrapedRecruitsMethod = 'get';

const getMyScrapedRecruitsEndpoint = composeUrls(
  API_URL,
  endpoints.recruit.myScrapsByOffset()
);

export const mockGetMyScrapedRecruitsByOffset = rest[
  getMyScrapedRecruitsMethod
](getMyScrapedRecruitsEndpoint, paginatedRecruitsHandler(false));

export const mockGetMyScrapedRecruitsByOffsetError = restError(
  'get',
  getMyScrapedRecruitsEndpoint,
  {
    message: 'mockGetMyScrapedRecruitsByOffset Error',
  }
);

export const mockGetEmptyMyScrapedRecruitsByOffset = rest[
  getMyScrapedRecruitsMethod
](getMyScrapedRecruitsEndpoint, paginatedRecruitsHandler(true, 0));
