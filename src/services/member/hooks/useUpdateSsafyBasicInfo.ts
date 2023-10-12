import { useMutation } from '@tanstack/react-query';

import { updateSsafyBasicInfo } from '~/services/member/apis';

export const useUpdateSsafyBasicInfo = () => {
  return useMutation({
    mutationFn: updateSsafyBasicInfo,
  });
};
