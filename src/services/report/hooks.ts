import { useMutation } from '@tanstack/react-query';

import { report } from '~/services/report/apis';

export const useReport = () => {
  return useMutation({
    mutationFn: report,
  });
};
