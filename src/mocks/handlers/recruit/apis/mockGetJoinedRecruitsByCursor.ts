import type { GetJoinedRecruitsByCursorApiData } from '~/services/recruit';

import { rest } from 'msw';

import { restInfiniteRecruitsSuccess } from '~/mocks/handlers/recruit/utils';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getJoinedRecruitsMethod = 'get';
const getJoinedRecruitsEndpoint = composeUrls(
  API_URL,
  endpoints.recruit.joinedListByCursor()
);

export const mockGetJoinedRecruitsByCursor = rest[getJoinedRecruitsMethod](
  getJoinedRecruitsEndpoint,
  restInfiniteRecruitsSuccess
);

export const mockGetJoinedRecruitsByCursorError = restError(
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
export const mockGetEmptyJoinedRecruitsByCursor = restSuccess<
  GetJoinedRecruitsByCursorApiData['data']
>(getJoinedRecruitsMethod, getJoinedRecruitsEndpoint, {
  data: emptyJoinedRecruits,
});
