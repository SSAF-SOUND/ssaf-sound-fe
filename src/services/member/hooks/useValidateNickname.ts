import { useMutation } from '@tanstack/react-query';

import { validateNickname } from '~/services/member/apis';

export const useValidateNickname = () => {
  return useMutation({
    mutationFn: validateNickname,
  });
};
