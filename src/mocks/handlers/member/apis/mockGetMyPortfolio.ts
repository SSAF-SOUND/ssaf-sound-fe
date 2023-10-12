import type { GetUserPortfolioApiData, UserPortfolio } from '~/services/member';

import { mockPortfolio } from '~/mocks/handlers/member/data';
import { restSuccess } from '~/mocks/utils';
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

export const mockGetUserPortfolio = createMockGetMyPortfolio(mockPortfolio);
