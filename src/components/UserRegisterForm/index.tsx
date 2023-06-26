import type { UpdateMyInfoParams } from '~/services/member';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { FormProvider } from 'react-hook-form';

import { ProgressBar } from '~/components/Common';
import TitleBar from '~/components/TitleBar';
import {
  useSetMyInfo,
  useUpdateMyInfo,
  useUpdateMyInfoForm,
} from '~/services/member';
import { flex } from '~/styles/utils';
import { createBoundClamp } from '~/utils';

import {
  useSetPhaseContext,
  usePhaseContext,
  useUserRegister,
} from './context';

// const phaseClamp = createBoundClamp([0, fields.length - 1]);

const UserRegisterForm = () => {
  const { fields } = useUserRegister();
  const router = useRouter();
  const setMyInfo = useSetMyInfo();
  const { mutate: updateMyInfo } = useUpdateMyInfo();
  const formMethods = useUpdateMyInfoForm();
  const { handleSubmit, setError } = formMethods;
  const phase = usePhaseContext();
  const FieldComponent = fields[phase].Component;

  const handleClickBackward = () => {
    // prevPhase
    const prevPhase = 1;
    // setPhase(Math.min(prevPhase, phase - 1));
  };

  // phase는 1씩 증가하거나, 1씩감소하거나, 특정 페이즈로 확 증가한다.
  // 1씩 증가할 때: prevPhase는 직전의 phase값이여야 한다.
  // 1씩 감소할 때: prevPhase는 현재

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
  // <TitleBar.Default
  //   withoutTitle
  //   withoutClose
  //   // withoutBackward={phase === 0}
  //   onClickBackward={handleClickBackward}
  //   css={titleBarCss}
  // />
  // <ProgressBar min={0} now={phase + 1} max={fields.length} />

  return (
    <form
      css={formCss}
      onSubmit={handleSubmit(onSubmit, (error) => {
        console.log(error);
      })}
    >
      <FormProvider {...formMethods}>
        <FieldComponent />
      </FormProvider>
    </form>
  );
};

export default UserRegisterForm;

const selfCss = css({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  padding: '10px 15px',
});

const formCss = css(
  {
    flexGrow: 1,
    padding: '60px 0 30px',
  },
  flex('', 'space-between', 'column')
);

const titleBarCss = css({
  padding: 0,
  margin: '0 -5px 12px',
});
