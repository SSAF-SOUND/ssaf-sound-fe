import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { queryKeys } from '~/react-query/common';

export const useAutoSignOut = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const myInfoQueryKey = queryKeys.user.myInfo();
    queryClient.cancelQueries(myInfoQueryKey);
    queryClient.setQueryData(myInfoQueryKey, null);
  }, [queryClient]);
};
