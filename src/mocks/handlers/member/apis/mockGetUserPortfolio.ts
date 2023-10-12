import type { GetUserPortfolioApiData, UserPortfolio } from '~/services/member';

import { mockPortfolio } from '~/mocks/handlers/member/data';
import { restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getUserPortfolioMethod = 'get';
const getUserPortfolioEndpoint = // eslint-disable-next-line
  // @ts-ignore
  composeUrls(API_URL, endpoints.user.portfolio(':id'));

export const createMockGetUserPortfolio = (portfolio: UserPortfolio) => {
  return restSuccess<GetUserPortfolioApiData['data']>(
    getUserPortfolioMethod,
    getUserPortfolioEndpoint,
    { data: { portfolioElement: portfolio } }
  );
};

export const mockGetUserPortfolio = createMockGetUserPortfolio(mockPortfolio);
