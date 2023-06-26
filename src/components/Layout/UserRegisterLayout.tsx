import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { ProgressBar } from '~/components/Common';
import TitleBar from '~/components/TitleBar';
import {
  usePhase,
  UserRegisterProvider,
  useSetPhase,
  useUserRegister,
} from '~/components/UserRegisterForm/context';

interface UserRegisterLayoutProps {
  children: ReactNode;
}

const UserRegisterLayout = (props: UserRegisterLayoutProps) => {
  return (
    <UserRegisterProvider>
      <UserRegisterLayoutLayer>{props.children}</UserRegisterLayoutLayer>
    </UserRegisterProvider>
  );
};

const UserRegisterLayoutLayer = (props: UserRegisterLayoutProps) => {
  const { children } = props;
  const { phase, prevPhase } = usePhase();
  const setPhase = useSetPhase();
  const { fields } = useUserRegister();

  const handleClickBackward = () =>
    setPhase(prevPhase < phase ? prevPhase : Math.max(phase - 1, 0));

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
      {children}
    </div>
  );
};

const selfCss = css({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  padding: '10px 15px',
});

const titleBarCss = css({
  padding: 0,
  margin: '0 -5px 12px',
});

export default UserRegisterLayout;
