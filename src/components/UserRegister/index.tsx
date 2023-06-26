import { UserRegisterProvider } from './context';
import UserRegisterForm from './UserRegisterForm';

const UserRegister = () => {
  return (
    <UserRegisterProvider>
      <UserRegisterForm />
    </UserRegisterProvider>
  );
};

export default UserRegister;
