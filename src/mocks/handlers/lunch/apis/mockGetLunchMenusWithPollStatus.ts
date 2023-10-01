import type { GetLunchMenusWithPollStatusApiData } from '~/services/lunch/apis';

import { lunchMock } from '~/mocks/handlers/lunch/data';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls, removeQueryParams, ResponseCode } from '~/utils';

const getLunchMenusWithPollStatusMethod = 'get';
const getLunchMenusWithPollStatusEndpoint = removeQueryParams(
  composeUrls(
    API_URL,
    removeQueryParams(endpoints.lunch.list({ campus: '서울', date: 'today' }))
  )
);

const createMockGetLunchMenusWithPollStatus = (
  data: GetLunchMenusWithPollStatusApiData['data']
) => {
  return restSuccess<GetLunchMenusWithPollStatusApiData['data']>(
    getLunchMenusWithPollStatusMethod,
    getLunchMenusWithPollStatusEndpoint,
    { data }
  );
};

export const mockGetLunchMenusWithPollStatus =
  createMockGetLunchMenusWithPollStatus(lunchMock.menus);

export const mockGetEmptyLunchMenusWithPollStatus =
  createMockGetLunchMenusWithPollStatus(lunchMock.emptyMenus);

export const mockGetLunchMenusWithPollStatusError = restError(
  getLunchMenusWithPollStatusMethod,
  getLunchMenusWithPollStatusEndpoint,
  {
    code: ResponseCode.INVALID_LUNCH_DATE,
    message: '조회할 수 없는 날짜입니다.',
  }
);
