import type { NextPageAuthConfig } from 'next/types';

import { FullPageLoader, loaderText } from '~/components/Common';
import { routes } from '~/utils/routes';

type CreateAuthGuardOptions = Omit<NextPageAuthConfig, 'loading'> & {
  loadingText: string;
};

export const createAuthGuard = (
  options: Partial<CreateAuthGuardOptions> = {}
): NextPageAuthConfig => {
  const {
    role = 'user',
    unauthorized = routes.unauthorized(),
    loadingText = loaderText.checkUser,
  } = options;
  return {
    role,
    loading: <FullPageLoader text={loadingText} />,
    unauthorized,
  };
};
