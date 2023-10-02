import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { FullPageLoader , loaderText } from '~/components/Common/FullPageLoader';
import { Logo } from '~/components/Common/Logo';
import { PageHead } from '~/components/Common/PageHead';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { SsafyIcon } from '~/components/Common/SsafyIcon';
import SignInButton from '~/components/SignInButton';
import TitleBar from '~/components/TitleBar';
import { useMyInfo } from '~/services/member';
import { flex, fontCss, pageCss, titleBarHeight } from '~/styles/utils';
import { globalMetaData } from '~/utils/metadata';
import { routes } from '~/utils/routes';

const metaTitle = '로그인';
const titleBarTitle = metaTitle;
const metaDescription = `${globalMetaData.description} 로그인을 통해 다양한 기능을 이용해보세요.`;

const SignInPage = () => {
  const router = useRouter();
  const { data: myInfo, isLoading: isMyInfoLoading } = useMyInfo({
    enabled: true,
    retry: 0,
  });

  const isSignedIn = !!myInfo;

  if (isMyInfoLoading) {
    return <FullPageLoader text={loaderText.checkUser} />;
  }

  if (isSignedIn) {
    router.replace(routes.main());
    return <FullPageLoader text={loaderText.checkUser} />;
  }

  return (
    <>
      <PageHead
        title={metaTitle}
        description={metaDescription}
        openGraph={{
          title: metaTitle,
          description: metaDescription,
          url: routes.signIn(),
        }}
      />

      <PageHeadingText text={metaTitle} />

      <div css={selfCss}>
        <TitleBar.Default withoutClose title={titleBarTitle} />
        <div css={logoContainerCss}>
          <SsafyIcon.LogoCharacter />
          <Logo size="lg" />
        </div>

        <div css={buttonGroupCss}>
          <SignInButton.Google />
          <SignInButton.GitHub />
          <SignInButton.Kakao />
          <SignInButton.Apple />

          <Link href={routes.main()} css={mainPageLinkCss}>
            메인페이지로 바로가기
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignInPage;

const selfPaddingY = titleBarHeight + 30;
const selfCss = css(
  { padding: `${selfPaddingY}px 0` },
  pageCss.minHeight,
  flex('', 'center', 'column', '10vh')
);

const logoContainerCss = css(flex('center', 'center', 'column', 18));

const buttonGroupCss = css({ padding: '30px 0' }, flex('', '', 'column', 10));

const mainPageLinkCss = css(
  {
    marginTop: 20,
    textDecoration: 'underline',
    alignSelf: 'center',
  },
  fontCss.style.R14
);
