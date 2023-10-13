import type { UsePortfolioOptions } from '~/services/member/hooks';

import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getMyPortfolio } from '~/services/member/apis';

export const useMyPortfolio = (options: Partial<UsePortfolioOptions> = {}) => {
  const { enabled } = options;
  return useQuery({
    queryKey: queryKeys.user.myPortfolio(),
    queryFn: getMyPortfolio,
    enabled,
  });
};
