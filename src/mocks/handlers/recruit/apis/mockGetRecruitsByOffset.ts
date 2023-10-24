import { rest } from 'msw';

import { paginatedRecruitsHandler } from '~/mocks/handlers/recruit/utils';
import { restError } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getRecruitsMethod = 'get';
const getRecruitsEndpoint = composeUrls(
  API_URL,
  endpoints.recruit.listByOffset()
);

export const mockGetRecruitsByOffset = rest[getRecruitsMethod](
  getRecruitsEndpoint,
  paginatedRecruitsHandler(false)
);

export const mockGetRecruitsByOffsetError = restError(
  getRecruitsMethod,
  getRecruitsEndpoint,
  {
    message: 'mockGetRecruitsByOffset Error',
  }
);

export const mockGetEmptyRecruitsByOffset = rest[getRecruitsMethod](
  getRecruitsEndpoint,
  paginatedRecruitsHandler(true, 0)
);
