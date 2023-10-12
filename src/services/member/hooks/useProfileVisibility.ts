import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getProfileVisibility } from '~/services/member/apis';

export const useProfileVisibility = () => {
  return useQuery({
    queryKey: queryKeys.user.profileVisibility(),
    queryFn: getProfileVisibility,
  });
};
