import { useMutation } from '@tanstack/react-query';

import { signIn } from '~/services/auth/apis';

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
  });
};
