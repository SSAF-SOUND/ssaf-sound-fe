import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getTermsOfService } from '~/services/meta/apis/getTermsOfService';

export const useTermsOfService = () => {
  return useQuery({
    queryKey: queryKeys.meta.termsOfService(),
    queryFn: getTermsOfService,
  });
};
