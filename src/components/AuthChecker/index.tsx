import type { NextPageAuthConfig } from 'next/types';
import type { ReactNode } from 'react';

import { useRouter } from 'next/router';

import { isValidElement } from 'react';

import { FullPageLoader } from '~/components/Common/FullPageLoader';
import { role, useMyInfo } from '~/services/member';

export interface AuthCheckerProps {
  auth: NextPageAuthConfig;
  children: ReactNode;
}

const AuthChecker = (props: AuthCheckerProps) => {
  const { auth, children } = props;

  const router = useRouter();
  const {
    data: myInfo,
    isInitialLoading,
    isError,
  } = useMyInfo({ enabled: true });

  if (isInitialLoading) {
    return auth.loading || <FullPageLoader />;
  }

  const isUnauthorized =
    isError ||
    !myInfo ||
    role(myInfo.memberRole).hasLowerAuthorityThan(auth.role);

  if (isUnauthorized) {
    if (typeof auth.unauthorized === 'string') {
      router.replace(auth.unauthorized);
    }

    if (isValidElement(auth.unauthorized)) {
      return auth.unauthorized;
    }

    return <FullPageLoader />;
  }

  return <>{children}</>;
};

export default AuthChecker;
