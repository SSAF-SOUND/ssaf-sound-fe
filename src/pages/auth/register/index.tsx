import type { CustomNextPage } from 'next/types';

import { useRouter } from 'next/router';

import { DefaultFullPageLoader } from '~/components/Common';
import { UserRegisterLayout } from '~/components/Layout';
import UserRegisterForm from '~/components/UserRegisterForm';
import { CertificationState, useMyAccountStatus } from '~/services/member';
import { routes } from '~/utils/routes';

const loaderText = '유저 정보를 확인하는 중입니다.';

const RegisterPage: CustomNextPage = () => {
  const router = useRouter();
  const { isRegisterRequired, myInfo } = useMyAccountStatus();

  if (!isRegisterRequired) {
    if (
      myInfo &&
      myInfo.ssafyInfo?.certificationState === CertificationState.UNCERTIFIED
    ) {
      router.replace(routes.certification.ssafy());
    } else {
      router.replace(routes.main());
    }

    return <DefaultFullPageLoader text={loaderText} />;
  }

  return (
    <UserRegisterLayout>
      <UserRegisterForm />
    </UserRegisterLayout>
  );
};

RegisterPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader text={loaderText} />,
  unauthorized: routes.main(),
};

export default RegisterPage;
