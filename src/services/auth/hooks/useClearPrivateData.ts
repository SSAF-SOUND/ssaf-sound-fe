import { useQueryClient } from '@tanstack/react-query';

import { clearPrivateData } from '~/utils/clearPrivateData';

export const useClearPrivateData = () => {
  const queryClient = useQueryClient();
  const clear = () => clearPrivateData(queryClient);
  return clear;
};
