import type { GetUserPortfolioApiData, UserPortfolio } from '~/services/member';

import {
  mockEmptyPortfolio,
  mockPortfolio,
} from '~/mocks/handlers/member/data';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getMyPortfolioMethod = 'get';
const getMyPortfolioEndpoint = composeUrls(
  API_URL,
  endpoints.user.myPortfolio()
);

export const createMockGetMyPortfolio = (portfolio: UserPortfolio) => {
  return restSuccess<GetUserPortfolioApiData['data']>(
    getMyPortfolioMethod,
    getMyPortfolioEndpoint,
    { data: { portfolioElement: portfolio } }
  );
};

export const mockGetMyPortfolio = createMockGetMyPortfolio(mockPortfolio);

export const mockGetMyEmptyPortfolio =
  createMockGetMyPortfolio(mockEmptyPortfolio);

export const mockGetMyPortfolioError = restError(
  getMyPortfolioMethod,
  getMyPortfolioEndpoint,
  { message: 'mockGetMyPortfolio Error' }
);
