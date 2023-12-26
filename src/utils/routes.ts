import { article } from '~/utils/client-routes/article';
import { auth } from '~/utils/client-routes/auth';
import { lunch } from '~/utils/client-routes/lunch';
import { notification } from '~/utils/client-routes/notification';
import { profile } from '~/utils/client-routes/profile';
import { recruit } from '~/utils/client-routes/recruit';

export const routes = {
  main: () => '/' as const,
  article,

  //
  auth,

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

  legal: (termId: number) => `/legal/${termId}` as const,

  notification,
};
