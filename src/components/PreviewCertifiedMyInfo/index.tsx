import type { UserInfo } from '~/services/member';

import { css } from '@emotion/react';

import { SsafyIcon, TrackSize } from '~/components/Common';
import NameCard from '~/components/NameCard';
import { flex, fontCss, palettes } from '~/styles/utils';

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
    </div>
  );
};

export default PreviewCertifiedMyInfo;

const selfCss = css(
  { minHeight: '100vh', padding: '40px 0' },
  flex('center', 'center', 'column', 120)
);

const topLayerCss = css({ textAlign: 'center' }, fontCss.style.B28);

const bottomLayerCss = css(flex('center', '', 'column', 26));
