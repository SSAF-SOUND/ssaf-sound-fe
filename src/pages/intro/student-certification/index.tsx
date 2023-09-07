import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import {
  Button,
  DefaultFullPageLoader,
  loaderText,
  PageHeadingText,
  SsafyIcon,
  TrackSize,
} from '~/components/Common';
import RollingAllTracks from '~/components/RollingAllTracks';
import { CertificationState, useMyInfo } from '~/services/member';
import { flex, fontCss, globalVars, palettes } from '~/styles/utils';
import { routes } from '~/utils';

const metaTitle = '학생 인증 가이드';

const StudentCertificationIntroPage = () => {
  const router = useRouter();
  const { data: myInfo } = useMyInfo();

  if (!myInfo) {
    router.replace(routes.unauthorized());
    return <DefaultFullPageLoader text={loaderText.checkUser} />;
  }

  const uncertified =
    myInfo.ssafyInfo?.certificationState === CertificationState.UNCERTIFIED;

  return (
    <>
      <PageHeadingText text={metaTitle} />

      <div css={selfCss}>
        <div css={greetingLayerCss}>
          <p>반갑습니다!</p>
          <p>{myInfo.nickname}님</p>
        </div>

        <SsafyIcon.Track size={TrackSize.LG2} />

        <div css={ellipsisLayerCss}>
          <div css={ellipsisCss} />
        </div>

        <div css={certificationGuideLayerCss}>
          <p>재학생 인증 시 프로필에</p>
          <p>SSAFY 트랙 뱃지가 표시됩니다</p>
        </div>

        <RollingAllTracks
          css={{
            width: 'auto',
            margin: `0 -${globalVars.mainLayoutPaddingX}`,
            overflow: 'hidden',
          }}
          seconds={15}
          gap={15}
        />

        <div css={{ padding: '0 15px' }}>
          <div css={questionLayerCss}>
            <p>SSAFY 재학생</p>
            <p>인증하시겠습니까?</p>
          </div>

          <div css={buttonLayerCss}>
            {uncertified ? (
              <Button size="lg" asChild>
                <Link href={routes.certification.student()}>
                  SSAFY 재학생 인증하기
                </Link>
              </Button>
            ) : (
              <Button
                size="lg"
                disabled
                onClick={() => router.push(routes.main())}
              >
                {myInfo.ssafyMember
                  ? '이미 인증된 계정입니다'
                  : 'SSAFY 학생만 인증할 수 있습니다'}
              </Button>
            )}

            <Button size="lg" variant="inverse" asChild>
              <Link href={routes.main()}>다음에</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentCertificationIntroPage;

StudentCertificationIntroPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader text={loaderText.checkUser} />,
  unauthorized: routes.unauthorized(),
};
StudentCertificationIntroPage.meta = {
  title: metaTitle,
  openGraph: { title: metaTitle },
  robots: { index: false, follow: false },
};

const selfCss = css({ padding: '120px 0' }, flex('stretch', 'center'));

const greetingLayerCss = css(
  {
    textAlign: 'center',
    height: '50%',
    marginBottom: '10vh',
  },
  fontCss.style.B28
);

const ellipsisLayerCss = css(
  {
    margin: '20vh 0',
  },
  flex('center', 'center')
);
const ellipsisCss = css({
  height: 65,
  width: 1,
  borderLeft: `1px dotted ${palettes.primary.light}`,
});

const certificationGuideLayerCss = css(
  { textAlign: 'center', marginBottom: '20vh' },
  fontCss.style.B18
);

const questionLayerCss = css({ margin: '20vh 0' }, fontCss.style.B28);

const buttonLayerCss = css(
  fontCss.style.B28,
  flex('stretch', 'center', 'column', 12)
);
