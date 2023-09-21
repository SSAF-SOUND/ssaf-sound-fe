import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useResetQueriesEffect = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.resetQueries();
  }, [queryClient]);
};
