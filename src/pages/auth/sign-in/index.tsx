import { css } from '@emotion/react';

import SignInButton from 'src/components/SignInButton';
import { Logo } from '~/components/Common';

export default function SignInPage() {
  return (
    <section>
      <main>
        <div css={logoContainerCss}>
          <Logo />
        </div>

        <div css={buttonGroupCss}>
          <SignInButton.Google />
          <SignInButton.GitHub />
          <SignInButton.Kakao />
          <SignInButton.Apple />
        </div>
      </main>
    </section>
  );
}

const logoContainerCss = css({
  textAlign: 'center',
});

const buttonGroupCss = css({
  display: 'flex',
  padding: 30,
  flexDirection: 'column',
  gap: 10,
});
