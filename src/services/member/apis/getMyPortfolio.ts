import type { UserPortfolio } from '~/services/member';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils/axios';

export type GetMyPortfolioApiData = ApiSuccessResponse<{
  portfolioElement: UserPortfolio;
}>;
export const getMyPortfolio = () => {
  const endpoint = endpoints.user.myPortfolio();

  return privateAxios
    .get<GetMyPortfolioApiData>(endpoint)
    .then((res) => res.data.data.portfolioElement);
};
