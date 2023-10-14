import type { GetJoinedRecruitsApiData } from '~/services/recruit';

import { rest } from 'msw';

import { restInfiniteRecruitsSuccess } from '~/mocks/handlers/recruit/utils';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getJoinedRecruitsMethod = 'get';
const getJoinedRecruitsEndpoint = composeUrls(
  API_URL,
  endpoints.recruit.joinedList()
);

export const mockGetJoinedRecruits = rest[getJoinedRecruitsMethod](
  getJoinedRecruitsEndpoint,
  restInfiniteRecruitsSuccess
);

export const mockGetJoinedRecruitsError = restError(
  getJoinedRecruitsMethod,
  getJoinedRecruitsEndpoint,
  {
    message: 'mockGetJoinedRecruits Error',
  }
);

export const emptyJoinedRecruits = {
  recruits: [],
  nextCursor: null,
  isLast: true,
};
export const mockGetEmptyJoinedRecruits = restSuccess<
  GetJoinedRecruitsApiData['data']
>(getJoinedRecruitsMethod, getJoinedRecruitsEndpoint, {
  data: emptyJoinedRecruits,
});
