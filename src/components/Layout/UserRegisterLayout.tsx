import type { ReactNode } from 'react';

import { UserRegisterProvider } from '~/components/UserRegisterForm/context';

interface UserRegisterLayoutProps {
  children: ReactNode;
}

const UserRegisterLayout = (props: UserRegisterLayoutProps) => {
  return (
    <UserRegisterProvider>
      <UserRegisterLayoutLayer>{props.children}</UserRegisterLayoutLayer>
    </UserRegisterProvider>
  );
};

const UserRegisterLayoutLayer = (props: UserRegisterLayoutProps) => {
  const { children } = props;
  return <div>{children}</div>;
};

export default UserRegisterLayout;
