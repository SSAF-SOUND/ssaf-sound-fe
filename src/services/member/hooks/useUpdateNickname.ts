import { useMutation } from '@tanstack/react-query';

import { updateNickname } from '~/services/member/apis';

export const useUpdateNickname = () => {
  return useMutation({
    mutationFn: updateNickname,
  });
};
