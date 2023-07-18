import type { PortfolioFormValues } from '~/components/Forms/PortfolioForm/utils/types';

import { useFormContext } from 'react-hook-form';

export const usePortfolioFormContext = () => {
  return useFormContext<PortfolioFormValues>();
};
