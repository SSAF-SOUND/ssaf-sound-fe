import type { CustomNextPage } from 'next/types';
import type { UserRegisterFormValues } from '~/components/UserRegisterForm/utils';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { useState } from 'react';

import { DefaultFullPageLoader } from '~/components/Common';
import UserRegisterForm from '~/components/UserRegisterForm';
import {
  useMyAccountStatus,
  useSetMyInfo,
  useUpdateMyInfo,
} from '~/services/member';
import { customToast, handleAxiosError } from '~/utils';
import { routes } from '~/utils/routes';

const loaderText = '유저 정보를 확인하는 중입니다.';

const RegisterPage: CustomNextPage = () => {
  const router = useRouter();
  const { isRegisterRequired } = useMyAccountStatus();
  const { mutateAsync: updateMyInfo } = useUpdateMyInfo();
  const [shouldCheckUserInfo, setShouldCheckUserInfo] = useState(true);
  const setMyInfo = useSetMyInfo();

  if (shouldCheckUserInfo && !isRegisterRequired) {
    router.replace(routes.main());
    return <DefaultFullPageLoader text={loaderText} />;
  }

  const onSubmit = async (value: UserRegisterFormValues) => {
    setShouldCheckUserInfo(false);

    try {
      const response = await updateMyInfo(value);
      setMyInfo(response);
      await router.replace(
        response.ssafyMember
          ? routes.intro.studentCertification()
          : routes.main()
      );
    } catch (error) {
      handleAxiosError(error, {
        onClientError: (response) => {
          customToast.clientError(response.message);
        },
      });
    }
  };

  return (
    <div css={selfCss}>
      <UserRegisterForm onSubmit={onSubmit} />
    </div>
  );
};

RegisterPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader text={loaderText} />,
  unauthorized: routes.main(),
};

export default RegisterPage;

const selfCss = css({ padding: '10px 15px' });
