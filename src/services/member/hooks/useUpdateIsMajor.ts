import { useMutation } from '@tanstack/react-query';

import { updateIsMajor } from '~/services/member/apis';

export const useUpdateIsMajor = () => {
  return useMutation({
    mutationFn: updateIsMajor,
  });
};
