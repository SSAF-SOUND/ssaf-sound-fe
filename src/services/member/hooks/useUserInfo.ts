import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getUserInfo } from '~/services/member/apis';

export const useUserInfo = (id: number) => {
  return useQuery({
    queryKey: queryKeys.user.userInfo(id),
    queryFn: () => getUserInfo(id),
  });
};
