import Image from 'next/image';

import { css } from '@emotion/react';

import welcomeImage from '~/assets/images/welcome.png';
import { Logo } from '~/components/Common';
import SignInButton from '~/components/SignInButton';
import { flex } from '~/styles/utils';

const SignInPage = () => {
  return (
    <section css={selfCss}>
      <div css={logoContainerCss}>
        <Image src={welcomeImage} alt="로그인 페이지 캐릭터 이미지" priority />
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

const buttonGroupCss = css({
  display: 'flex',
  padding: 30,
  flexDirection: 'column',
  gap: 10,
});
