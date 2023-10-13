import type { UserPortfolio } from '~/services/member/utils';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils/axios';

export interface UpdateMyPortfolioParams extends UserPortfolio {}

export type UpdateMyPortfolioBody = UpdateMyPortfolioParams;

export const updateMyPortfolio = (params: UpdateMyPortfolioParams) => {
  const endpoint = endpoints.user.myPortfolio();
  const body: UpdateMyPortfolioBody = params;

  return privateAxios.put(endpoint, body).then((res) => res.data);
};
