import type { UserRegisterFormValues } from './types';

import { useFormContext } from 'react-hook-form';

export const useUserRegisterFormContext = () => {
  return useFormContext<UserRegisterFormValues>();
};
