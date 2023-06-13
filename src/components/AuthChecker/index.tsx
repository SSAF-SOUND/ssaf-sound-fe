import type { NextPageAuthConfig } from 'next/types';
import type { ReactNode } from 'react';

import { useRouter } from 'next/router';

import { role, useMyInfo } from '~/services/member';

export interface AuthCheckerProps {
  auth: NextPageAuthConfig;
  children: ReactNode;
}

const AuthChecker = (props: AuthCheckerProps) => {
  const { auth, children } = props;

  const router = useRouter();
  const { data: myInfo, isLoading, isError } = useMyInfo();

  if (isLoading) {
    return auth.loading || <DefaultLoadingComponent />;
  }

  const isUnauthorized =
    isError || role(myInfo.role).hasLowerAuthorityThan(auth.role);

  if (isUnauthorized) {
    if (typeof auth.unauthorized === 'string') {
      router.replace(auth.unauthorized);
    }

    return auth.unauthorized;
  }

  return <>{children}</>;
};

const DefaultLoadingComponent = () => <div>로딩중</div>;

export default AuthChecker;
