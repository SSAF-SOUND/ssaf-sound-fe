import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const updateMyPortfolioMethod = 'put';
const updateMyPortfolioEndpoint = composeUrls(
  API_URL,
  endpoints.user.myPortfolio()
);

export const mockUpdateMyPortfolio = restSuccess(
  updateMyPortfolioMethod,
  updateMyPortfolioEndpoint,
  { data: null }
);

export const mockUpdateMyPortfolioError = restError(
  updateMyPortfolioMethod,
  updateMyPortfolioEndpoint,
  {
    message: 'mockUpdateMyPortfolio Error',
  }
);
