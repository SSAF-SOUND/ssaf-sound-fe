import { rest } from 'msw';

import { paginatedRecruitsHandler } from '~/mocks/handlers/recruit/utils';
import { restError } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getJoinedRecruitsMethod = 'get';
const getJoinedRecruitsEndpoint = composeUrls(
  API_URL,
  endpoints.recruit.joinedListByOffset()
);

export const mockGetJoinedRecruitsByOffset = rest[getJoinedRecruitsMethod](
  getJoinedRecruitsEndpoint,
  paginatedRecruitsHandler(false)
);

export const mockGetJoinedRecruitsByOffsetError = restError(
  getJoinedRecruitsMethod,
  getJoinedRecruitsEndpoint,
  {
    message: 'mockGetJoinedRecruitsByOffset Error',
  }
);
export const mockGetEmptyJoinedRecruitsByOffset = rest[getJoinedRecruitsMethod](
  getJoinedRecruitsEndpoint,
  paginatedRecruitsHandler(true, 0)
);
