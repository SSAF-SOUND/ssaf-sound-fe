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

import { usePhase, useUserRegisterFormFields } from './context';

const UserRegisterForm = () => {
  const fields = useUserRegisterFormFields();
  const router = useRouter();
  const setMyInfo = useSetMyInfo();
  const { mutate: updateMyInfo, isLoading: isMutating } = useUpdateMyInfo();
  const formMethods = useUpdateMyInfoForm();
  const { handleSubmit, setError } = formMethods;

  const { phase } = usePhase();
  const FieldComponent = fields[phase].Component;

  const onSubmit = async (value: UpdateMyInfoParams) => {
    updateMyInfo(value, {
      onSuccess: (value) => {
        setMyInfo(value);
        router.push('/main');
      },
      onError: (error) => {
        // LATER
        console.error(error);
      },
    });
  };

  return (
    <form css={formCss} onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...formMethods}>
        <FieldComponent isMutating={isMutating} />
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
