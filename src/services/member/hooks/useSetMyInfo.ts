import type { UserInfo } from '~/services/member/utils';

import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { queryKeys } from '~/react-query/common';

export const useSetMyInfo = () => {
  const queryClient = useQueryClient();
  const setMyInfo = useCallback(
    (updater?: UserInfo | ((payload?: UserInfo) => UserInfo | undefined)) => {
      const queryKey = queryKeys.user.myInfo();
      queryClient.setQueryData<UserInfo>(queryKey, updater);
    },
    [queryClient]
  );

  return setMyInfo;
};
