import type { NextPageAuthConfig } from 'next/types';
import type { ReactNode } from 'react';

export interface AuthCheckerProps {
  auth: NextPageAuthConfig;
  children: ReactNode;
}

const AuthChecker = (props: AuthCheckerProps) => {
  const { auth, children } = props;

  return <>{children}</>;
};

export default AuthChecker;
