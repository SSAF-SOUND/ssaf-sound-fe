import type { UpdateMyInfoParams } from '~/services/member';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { FormProvider } from 'react-hook-form';

import {
  useSetMyInfo,
  useUpdateMyInfo,
  useUpdateMyInfoForm,
} from '~/services/member';
import { flex } from '~/styles/utils';
import { customToast, handleAxiosError } from '~/utils';
import { routes } from '~/utils/routes';

import { usePhase, useUserRegisterFormFields } from './context';

const UserRegisterForm = () => {
  const router = useRouter();
  const fields = useUserRegisterFormFields();
  const setMyInfo = useSetMyInfo();
  const { mutateAsync: updateMyInfo } = useUpdateMyInfo();
  const formMethods = useUpdateMyInfoForm();
  const { handleSubmit } = formMethods;

  const { phase } = usePhase();
  const FieldComponent = fields[phase].Component;

  const onValid = async (value: UpdateMyInfoParams) => {
    try {
      const response = await updateMyInfo(value);
      setMyInfo(response);
      await router.replace(routes.certification.ssafy());
    } catch (error) {
      handleAxiosError(error, {
        onClientError: (response) => {
          customToast.clientError(response.message);
        },
      });
    }
  };

  return (
    <form css={formCss} onSubmit={handleSubmit(onValid)}>
      <FormProvider {...formMethods}>
        <FieldComponent />
      </FormProvider>
    </form>
  );
};

export default UserRegisterForm;

const formCss = css(
  {
    flexGrow: 1,
    padding: '60px 0 30px',
  },
  flex('', 'space-between', 'column')
);
