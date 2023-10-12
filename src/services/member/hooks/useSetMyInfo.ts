import type { UserInfo } from '~/services/member/utils';

import { useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';

export const useSetMyInfo = () => {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.user.myInfo();
  const setMyInfo = (
    updater?: UserInfo | ((payload?: UserInfo) => UserInfo | undefined)
  ) => {
    queryClient.setQueryData<UserInfo>(queryKey, updater);
  };

  return setMyInfo;
};
