import { UserRegisterProvider } from './context';
import UserRegisterRoot from './Root';

interface UserRegisterProps {
  defaultPhase?: number;
}

const UserRegister = (props: UserRegisterProps) => {
  const { defaultPhase } = props;
  return (
    <UserRegisterProvider defaultPhase={defaultPhase}>
      <UserRegisterRoot />
    </UserRegisterProvider>
  );
};

export default UserRegister;
