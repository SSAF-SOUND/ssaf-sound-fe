import { css } from '@emotion/react';

import { Logo, SsafyIcon } from '~/components/Common';
import SignInButton from '~/components/SignInButton';
import { flex } from '~/styles/utils';

const SignInPage = () => {
  return (
    <section css={selfCss}>
      <div css={logoContainerCss}>
        <SsafyIcon.LogoCharacter />
        <Logo size="lg" />
      </div>

      <div css={buttonGroupCss}>
        <SignInButton.Google />
        <SignInButton.GitHub />
        <SignInButton.Kakao />
        <SignInButton.Apple />
      </div>
    </section>
  );
};

export default SignInPage;

const selfCss = css({ height: '100vh' }, flex('', 'center', 'column', '15vh'));

const logoContainerCss = css(flex('center', 'center', 'column', 18));

const buttonGroupCss = css({ padding: 30 }, flex('', '', 'column', 10));
