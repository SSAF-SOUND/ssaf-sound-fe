import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';

import { getMyInfo } from './apis';

interface UseMyInfoOptions {
  enabled?: boolean;
}

export const useMyInfo = (options: UseMyInfoOptions = {}) => {
  const { enabled = true } = options;

  return useQuery({
    queryKey: queryKeys.user.myInfo(),
    queryFn: getMyInfo,
    staleTime: Infinity,
    enabled,
  });
};

export const useIsAuthenticated = () => {
  const { data } = useMyInfo();

  return Boolean(data);
};
