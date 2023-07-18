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
import { flex } from '~/styles/utils';
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

    const { year, ...restValue } = value;
    try {
      const response = await updateMyInfo({
        ...restValue,
        semester: year,
      });
      setMyInfo(response);
      await router.replace(routes.intro.studentCertification());
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
      <UserRegisterForm onSubmit={onSubmit} css={formCss} />
    </div>
  );
};

RegisterPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader text={loaderText} />,
  unauthorized: routes.main(),
};

export default RegisterPage;

const selfCss = css({ minHeight: '100vh', padding: '10px 15px' }, flex());
const formCss = css({ flexGrow: 1 });
