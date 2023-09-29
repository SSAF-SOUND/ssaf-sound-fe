import type { GetRecruitsApiData } from '~/services/recruit';

import { rest } from 'msw';

import { restInfiniteRecruitsSuccess } from '~/mocks/handlers/recruit/utils';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getRecruitsMethod = 'get';
const getRecruitsEndpoint = composeUrls(API_URL, endpoints.recruit.list());

export const mockGetRecruits = rest[getRecruitsMethod](
  getRecruitsEndpoint,
  restInfiniteRecruitsSuccess
);

export const mockGetRecruitsError = restError(
  getRecruitsMethod,
  getRecruitsEndpoint,
  {
    message: 'mockGetRecruitsError',
  }
);

const emptyRecruits = {
  recruits: [],
  nextCursor: null,
  isLast: true,
};

export const mockGetEmptyRecruits = restSuccess<GetRecruitsApiData['data']>(
  getRecruitsMethod,
  getRecruitsEndpoint,
  {
    data: emptyRecruits,
  }
);
