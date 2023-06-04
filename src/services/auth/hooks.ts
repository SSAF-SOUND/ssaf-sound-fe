import { useMutation } from '@tanstack/react-query';

import { signIn } from './apis';

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
  });
};
