import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getMyInfo } from '~/services/member/apis';
import { toMs } from '~/utils/toMs';

interface UseMyInfoOptions {
  enabled?: boolean;
  retry?: number | boolean;
}

export const useMyInfo = (options: UseMyInfoOptions = {}) => {
  const { enabled = false, retry = 1 } = options;

  return useQuery({
    queryKey: queryKeys.user.myInfo(),
    queryFn: getMyInfo,
    staleTime: Infinity,
    enabled,
    retry,
    retryDelay: toMs(1),
  });
};
