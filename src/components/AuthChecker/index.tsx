import type { NextPageAuthConfig } from 'next/types';
import type { ReactNode } from 'react';

import { useRouter } from 'next/router';

import { role, useMyInfo } from '~/services/member';
import { flex } from '~/styles/utils';

export interface AuthCheckerProps {
  auth: NextPageAuthConfig;
  children: ReactNode;
}

const AuthChecker = (props: AuthCheckerProps) => {
  const { auth, children } = props;

  const router = useRouter();
  const { data: myInfo, isInitialLoading, isError } = useMyInfo();

  if (isInitialLoading) {
    return auth.loading || <DefaultLoadingComponent />;
  }

  const isUnauthorized =
    isError ||
    !myInfo ||
    role(myInfo.memberRole).hasLowerAuthorityThan(auth.role);

  if (isUnauthorized) {
    if (typeof auth.unauthorized === 'string') {
      router.replace(auth.unauthorized);
    }

    return <>{auth.unauthorized}</>;
  }

  return <>{children}</>;
};

const DefaultLoadingComponent = () => (
  <div css={flex('center', 'center')}>로딩중...</div>
);

export default AuthChecker;
