import type { MyInfoEditFormValues } from './types';

import { useFormContext } from 'react-hook-form';

export const useMyInfoEditFormContext = () => {
  return useFormContext<MyInfoEditFormValues>();
};
