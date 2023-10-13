import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getUserProfileVisibility } from '~/services/member/apis';

export const useUserProfileVisibility = (id: number) => {
  return useQuery({
    queryKey: queryKeys.user.userProfileVisibility(id),
    queryFn: () => getUserProfileVisibility(id),
  });
};
