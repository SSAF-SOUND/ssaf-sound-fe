import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { ProgressBar } from '~/components/Common';
import TitleBar from '~/components/TitleBar';
import {
  usePhase,
  useUserRegisterFormFields,
  withUserRegisterFormProvider,
} from '~/components/UserRegisterForm/context';

interface UserRegisterLayoutProps {
  children: ReactNode;
}

const UserRegisterLayout = (props: UserRegisterLayoutProps) => {
  const { children } = props;
  const { currentPhase, popPhase } = usePhase();
  const fields = useUserRegisterFormFields();

  return (
    <div css={selfCss}>
      <TitleBar.Default
        withoutTitle
        withoutClose
        withoutBackward={currentPhase === 0}
        onClickBackward={popPhase}
        css={titleBarCss}
      />
      <ProgressBar min={0} now={currentPhase + 1} max={fields.length} />
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

export default withUserRegisterFormProvider(UserRegisterLayout);
