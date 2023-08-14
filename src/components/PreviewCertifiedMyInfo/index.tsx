import type { UserInfo } from '~/services/member';

import Link from 'next/link';

import { css } from '@emotion/react';

import { Button, SsafyIcon, TrackSize } from '~/components/Common';
import NameCard from '~/components/NameCard';
import { flex, fontCss, pageMinHeight, palettes } from '~/styles/utils';
import { routes } from '~/utils';

interface PreviewCertifiedMyInfoProps {
  userInfo: UserInfo;
}

const PreviewCertifiedMyInfo = (props: PreviewCertifiedMyInfoProps) => {
  const { userInfo } = props;

  return (
    <div css={selfCss}>
      <div css={topLayerCss}>
        <p>SSAFY 캐릭터 프로필이</p>
        <p>생성되었습니다</p>
        <p
          css={[
            fontCss.style.R16,
            { color: palettes.primary.default, marginTop: 18 },
          ]}
        >
          SSAFY만의 커뮤니티를 이용해보세요
        </p>
      </div>
      <div css={bottomLayerCss}>
        <SsafyIcon.Track
          size={TrackSize.LG2}
          name={userInfo?.ssafyInfo?.majorTrack}
        />

        <NameCard userInfo={userInfo} withBackground />
      </div>

      <Button css={{ width: '100%' }} size="lg" asChild>
        <Link href={routes.main()}>확인</Link>
      </Button>
    </div>
  );
};

export default PreviewCertifiedMyInfo;

const selfCss = css(
  {
    minHeight: `max(${pageMinHeight}px, 100vh)`,
    padding: '40px 15px',
  },
  flex('center', 'center', 'column', 100)
);

const topLayerCss = css({ textAlign: 'center' }, fontCss.style.B28);

const bottomLayerCss = css(flex('center', '', 'column', 26));
