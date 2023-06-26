import type { UpdateMyInfoParams } from '~/services/member';

import { css } from '@emotion/react';
import { FormProvider } from 'react-hook-form';

import { Button, ProgressBar } from '~/components/Common';
import TitleBar from '~/components/TitleBar';
import { useUpdateMyInfoForm } from '~/services/member';
import { flex } from '~/styles/utils';
import { createBoundClamp } from '~/utils';

import {
  useSetPhaseContext,
  usePhaseContext,
  usePrevPhaseContext,
} from './context';
import { IsMember, Year, Campus, IsMajor, Nickname } from './Fields';

const fields = [
  () => <IsMember />,
  () => <Year />,
  () => <Campus />,
  () => <IsMajor />,
  () => <Nickname />,
];

const phaseClamp = createBoundClamp([0, fields.length - 1]);
const nicknamePhase = 4;

const UserRegisterRoot = () => {
  const formMethods = useUpdateMyInfoForm();
  const { handleSubmit, setError } = formMethods;
  const unSafePhase = usePhaseContext();
  const prevPhase = usePrevPhaseContext();
  const setPhase = useSetPhaseContext();
  const phase = phaseClamp(unSafePhase);
  const Field = fields[phase];

  const handleClickBackward = () => {
    setPhase(Math.min(prevPhase, phase - 1));
  };

  const onSubmit = (value: UpdateMyInfoParams) => {
    setError('nickname', {
      message: '닉네임이 중복됩니다.',
    });
  };

  return (
    <div css={selfCss}>
      <TitleBar.Default
        withoutTitle
        withoutClose
        withoutBackward={phase === 0}
        onClickBackward={handleClickBackward}
        css={titleBarCss}
      />

      <ProgressBar min={0} now={phase + 1} max={fields.length} />

      <FormProvider {...formMethods}>
        <form
          css={formCss}
          onSubmit={handleSubmit(onSubmit, (error) => {
            console.log(error);
          })}
        >
          <Field />
        </form>
      </FormProvider>
    </div>
  );
};

export default UserRegisterRoot;

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
