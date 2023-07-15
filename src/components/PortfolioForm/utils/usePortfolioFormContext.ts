import type { PortfolioFormValues } from '~/components/PortfolioForm/utils/types';

import { useFormContext } from 'react-hook-form';

export const usePortfolioFormContext = () => {
  return useFormContext<PortfolioFormValues>();
};
