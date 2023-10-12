import { useRouter } from 'next/router';

import { useMyAccountStatus } from '~/services/member/hooks/useMyAccountStatus';
import { routes } from '~/utils/routes';

export const useCheckRegisterRequired = () => {
  const router = useRouter();
  const userRegisterRoute = routes.userRegister();
  const { isRegisterRequired } = useMyAccountStatus();
  const isRegisterPage = router.pathname === userRegisterRoute;

  if (!isRegisterPage && isRegisterRequired) {
    router.replace(userRegisterRoute);
  }
};
