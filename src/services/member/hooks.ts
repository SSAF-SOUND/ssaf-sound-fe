import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';

import { getMyInfo } from './apis';

export const useMyInfo = () => {
  return useQuery({
    queryKey: queryKeys.user.myInfo(),
    queryFn: getMyInfo,
  });
};

export const useIsAuthenticated = () => {
  const { data } = useMyInfo();

  return Boolean(data);
};
