import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteAccount, signIn, signOut } from '~/services/auth/apis';
import { clearPrivateData } from '~/utils';

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
  });
};

export const useSignOut = () => {
  const clearPrivateData = useClearPrivateData();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      clearPrivateData();
    },
  });
};

export const useDeleteAccount = () => {
  const clearPrivateData = useClearPrivateData();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      clearPrivateData();
    },
  });
};

export const useClearPrivateData = () => {
  const queryClient = useQueryClient();
  const clear = () => clearPrivateData(queryClient);
  return clear;
};
