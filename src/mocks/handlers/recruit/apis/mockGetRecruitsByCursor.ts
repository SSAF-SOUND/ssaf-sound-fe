import type { GetRecruitsByCursorApiData } from '~/services/recruit';

import { rest } from 'msw';

import { restInfiniteRecruitsSuccess } from '~/mocks/handlers/recruit/utils';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getRecruitsMethod = 'get';
const getRecruitsEndpoint = composeUrls(
  API_URL,
  endpoints.recruit.listByCursor()
);

export const mockGetRecruitsByCursor = rest[getRecruitsMethod](
  getRecruitsEndpoint,
  restInfiniteRecruitsSuccess
);

export const mockGetRecruitsByCursorError = restError(
  getRecruitsMethod,
  getRecruitsEndpoint,
  {
    message: 'mockGetRecruits Error',
  }
);

const emptyRecruits = {
  recruits: [],
  nextCursor: null,
  isLast: true,
};

export const mockGetEmptyRecruitsByCursor = restSuccess<
  GetRecruitsByCursorApiData['data']
>(getRecruitsMethod, getRecruitsEndpoint, {
  data: emptyRecruits,
});
