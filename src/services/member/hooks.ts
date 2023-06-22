import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';

import { getMyInfo } from './apis';

interface UseMyInfoOptions {
  enabled?: boolean;
  retry?: number | boolean;
}

export const useMyInfo = (options: UseMyInfoOptions = {}) => {
  const { enabled = true, retry } = options;

  return useQuery({
    queryKey: queryKeys.user.myInfo(),
    queryFn: getMyInfo,
    staleTime: Infinity,
    enabled,
    retry,
  });
};

export const useIsAuthenticated = () => {
  const { data } = useMyInfo();

  return Boolean(data);
};
