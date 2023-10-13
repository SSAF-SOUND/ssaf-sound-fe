import type { OAuthProviders } from '~/services/auth/utils';

import { article } from '~/utils/client-routes/article';
import { lunch } from '~/utils/client-routes/lunch';
import { profile } from '~/utils/client-routes/profile';
import { recruit } from '~/utils/client-routes/recruit';

export const routes = {
  root: () => '/' as const,
  main: () => '/main' as const,
  article,

  //
  signIn: () => '/auth/sign-in' as const,
  userRegister: () => '/auth/register' as const,
  callback: (provider: OAuthProviders) => `/auth/callback/${provider}` as const,

  //
  certification: {
    student: () => '/certification/student' as const,
  },

  //
  intro: {
    studentCertification: () => '/intro/student-certification' as const,
  },

  profile,

  //
  unauthorized: () => '/unauthorized' as const,

  //
  recruit,

  //
  lunch,
};
