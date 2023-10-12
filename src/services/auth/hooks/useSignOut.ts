import { useMutation } from '@tanstack/react-query';

import { signOut } from '~/services/auth/apis/signOut';
import { useClearPrivateData } from '~/services/auth/hooks/useClearPrivateData';

export const useSignOut = () => {
  const clearPrivateData = useClearPrivateData();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      clearPrivateData();
    },
  });
};
