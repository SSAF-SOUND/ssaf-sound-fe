import type { FormEventHandler } from 'react';

import { css } from '@emotion/react';
import { HiOutlineArrowLeft } from 'react-icons/hi';

import { ProgressBar } from '~/components/Common';

import { useSetPhase, usePhase } from './context';
import { IsMember, Year, Campus, IsMajor, Nickname } from './Fields';

const fields = [
  () => <IsMember />,
  () => <Year />,
  () => <Campus />,
  () => <IsMajor />,
  () => <Nickname />,
];

const UserRegisterRoot = () => {
  const phase = usePhase();
  const setPhase = useSetPhase();

  const Field = fields[phase];
  const handleClickBackwardButton = () => {
    setPhase(Math.max(0, phase - 1));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div css={selfCss}>
      {/* Top bar */}
      <header>
        <button
          type="button"
          css={backwardButtonCss}
          onClick={handleClickBackwardButton}
        >
          <HiOutlineArrowLeft size={50} css={backwardIconCss} />
        </button>
      </header>
      <div>
        <ProgressBar min={0} now={phase + 1} max={fields.length} />
      </div>
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
  padding: '20px 20px',
  gap: 20,
});

const formCss = css({
  flexGrow: 1,
  padding: '50px 0',
});

const backwardButtonCss = css({
  cursor: 'pointer',
  backgroundColor: 'transparent',
  ':focus': {
    outline: 'inset',
  },
});

const backwardIconCss = css({
  pointerEvents: 'none',
});

export default UserRegisterRoot;
