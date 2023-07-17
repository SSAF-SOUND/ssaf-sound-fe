import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { Logo, SsafyIcon, DefaultFullPageLoader } from '~/components/Common';
import SignInButton from '~/components/SignInButton';
import { useMyAccountStatus } from '~/services/member';
import { flex, pageMinHeight } from '~/styles/utils';
import { routes } from '~/utils/routes';

const SignInPage = () => {
  const { isAuthenticated, isChecking } = useMyAccountStatus();
  const router = useRouter();
  const loaderText = '유저 정보를 확인중입니다.';

  if (isAuthenticated) {
    router.replace(routes.main());
    return <DefaultFullPageLoader text={loaderText} />;
  }

  if (isChecking) {
    return <DefaultFullPageLoader text={loaderText} />;
  }

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

const selfCss = css(
  {
    height: '100vh',
    minHeight: pageMinHeight,
    padding: '60px 0',
  },
  flex('', 'center', 'column', '15vh')
);

const logoContainerCss = css(flex('center', 'center', 'column', 18));

const buttonGroupCss = css({ padding: 30 }, flex('', '', 'column', 10));
