import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getUserPortfolio } from '~/services/member/apis';

export interface UsePortfolioOptions {
  enabled: boolean;
}

export const useUserPortfolio = (
  id: number,
  options: Partial<UsePortfolioOptions> = {}
) => {
  const { enabled } = options;
  return useQuery({
    queryKey: queryKeys.user.portfolio(id),
    queryFn: () => getUserPortfolio(id),
    enabled,
  });
};
