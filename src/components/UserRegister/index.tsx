import { UserRegisterProvider } from './context';
import UserRegisterRoot from './Root';

const UserRegister = () => {
  return (
    <UserRegisterProvider>
      <UserRegisterRoot />
    </UserRegisterProvider>
  );
};

export default UserRegister;
