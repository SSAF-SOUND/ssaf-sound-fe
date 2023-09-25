import { rest } from 'msw';

import { restInfiniteRecruitsSuccess } from '~/mocks/handlers/recruit/utils';
import { restError } from '~/mocks/utils';
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
