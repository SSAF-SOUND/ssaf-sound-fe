import { useMutation } from '@tanstack/react-query';

import { deleteAccount } from '~/services/auth/apis/deleteAccount';
import { useClearPrivateData } from '~/services/auth/hooks/useClearPrivateData';

export const useDeleteAccount = () => {
  const clearPrivateData = useClearPrivateData();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      clearPrivateData();
    },
  });
};
