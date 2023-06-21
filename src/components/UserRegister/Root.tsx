import type { FormEventHandler } from 'react';

import { css } from '@emotion/react';

import { ProgressBar } from '~/components/Common';
import TitleBar from '~/components/TitleBar';
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

const UserRegisterRoot = () => {
  const unSafePhase = usePhaseContext();
  const prevPhase = usePrevPhaseContext();
  const setPhase = useSetPhaseContext();
  const phase = phaseClamp(unSafePhase);

  const Field = fields[phase];
  const handleClickBackward = () => {
    setPhase(Math.min(prevPhase, phase - 1));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div css={selfCss}>
      <TitleBar.Default
        withoutTitle
        withoutClose
        onClickBackward={handleClickBackward}
        css={topBarCss}
      />

      <ProgressBar min={0} now={phase + 1} max={fields.length} />

      <form css={formCss} onSubmit={handleSubmit}>
        <Field />
      </form>
    </div>
  );
};

const selfCss = css({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  padding: '10px 15px',
});

const formCss = css({
  flexGrow: 1,
  padding: '60px 0 30px',
});

const topBarCss = css({
  padding: 0,
  margin: '0 -5px 12px',
});

export default UserRegisterRoot;
