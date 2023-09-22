import type { CustomNextPage } from 'next/types';
import type { UserRegisterFormValues } from '~/components/Forms/UserRegisterForm/utils';

import { useRouter } from 'next/router';

import { css, keyframes } from '@emotion/react';
import { useEffect, useState } from 'react';

import UserRegisterForm from 'src/components/Forms/UserRegisterForm';
import {
  FullPageLoader,
  loaderText,
  Logo,
  PageHeadingText,
  SsafyIcon,
} from '~/components/Common';
import { useMyAccountStatus, useUpdateMyInfo } from '~/services/member';
import {
  flex,
  fontCss,
  pageCss,
  pageMaxWidth,
  pageMinHeight,
  pageMinWidth,
  palettes,
  position,
  zIndex,
} from '~/styles/utils';
import {
  createAuthGuard,
  createNoIndexPageMetaData,
  handleAxiosError,
} from '~/utils';
import { routes } from '~/utils/routes';

const metaTitle = '회원가입';
const titleBarTitle = metaTitle;

const RegisterPage: CustomNextPage = () => {
  const router = useRouter();
  const { isRegisterRequired } = useMyAccountStatus();
  const { mutateAsync: updateMyInfo } = useUpdateMyInfo();
  const [shouldCheckUserInfo, setShouldCheckUserInfo] = useState(true);

  if (shouldCheckUserInfo && !isRegisterRequired) {
    router.replace(routes.main());
    return <FullPageLoader text={loaderText.checkUser} />;
  }

  const onValidSubmit = async (formValues: UserRegisterFormValues) => {
    setShouldCheckUserInfo(false);

    try {
      await updateMyInfo(formValues);
      await router.replace(routes.intro.studentCertification());
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <>
      <PageHeadingText text={metaTitle} />

      <div css={selfCss}>
        <UserRegisterForm
          options={{ titleBarTitle }}
          onValidSubmit={onValidSubmit}
          css={formCss}
        />
      </div>

      <Welcome />
    </>
  );
};

export default RegisterPage;
RegisterPage.auth = createAuthGuard({ unauthorized: routes.main() });
RegisterPage.meta = createNoIndexPageMetaData(metaTitle);

const selfCss = css(pageCss.minHeight, flex());
const formCss = css({ flexGrow: 1 });

const Welcome = () => {
  const renderDuration = 2500;
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), renderDuration);
    return () => clearTimeout(timer);
  }, []);

  if (hide) return <></>;

  return (
    <div css={welcomeSelfCss}>
      <div css={overlayBackgroundCss} />
      <div css={overlayCss}>
        <div css={overlayContentCss}>
          <SsafyIcon.LogoCharacter />
          <Logo size="lg" />
          <p css={fontCss.style.B24}>에 오신것을 환영합니다!</p>
        </div>
      </div>
    </div>
  );
};

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const welcomeSelfCss = css({
  animationName: fadeOut,
  animationDelay: '1s',
  animationDuration: '1.5s',
  animationFillMode: 'forwards',
  animationTimingFunction: 'ease-out',
  position: 'relative',
  zIndex: zIndex.fixed.max,
});

const overlayBackgroundCss = css({
  position: 'fixed',
  inset: 0,
  backgroundColor: palettes.background.default,
});

const overlayContentCss = css(
  { position: 'relative', top: -60 },
  flex('flex-start', '', 'column', 16)
);
const overlayCss = css(
  {
    paddingLeft: 30,
    minWidth: pageMinWidth - 50,
    maxWidth: pageMaxWidth,
    width: '100vw',
    height: `max(100vh, ${pageMinHeight}px)`,
  },
  position.xy('center', 'start', 'fixed'),
  flex('flex-start', 'center', 'column')
);
