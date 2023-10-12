import type { UserPortfolio } from '~/services/member';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils/axios';

export type GetUserPortfolioApiData = ApiSuccessResponse<{
  portfolioElement: UserPortfolio;
}>;
export const getUserPortfolio = (id: number) => {
  const endpoint = endpoints.user.portfolio(id);

  return privateAxios
    .get<GetUserPortfolioApiData>(endpoint)
    .then((res) => res.data.data.portfolioElement);
};
