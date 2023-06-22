import type { CustomNextPage } from 'next/types';

import UserRegister from '~/components/UserRegister';

const RegisterPage: CustomNextPage = () => {
  return <UserRegister />;
};

RegisterPage.auth = {
  role: 'user',
  loading: <div>Loading</div>,
  unauthorized: <div>Unauthorized</div>,
};

export default RegisterPage;
