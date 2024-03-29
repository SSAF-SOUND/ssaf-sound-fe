import type { CSSProperties } from 'react';

import { css } from '@emotion/react';
import { AccessibleIcon } from '@radix-ui/react-accessible-icon';

import PrimaryDefaultTrack from '~/assets/images/track-default-primary.svg';
import SecondaryDefaultTrack from '~/assets/images/track-default-secondary.svg';
import EmbeddedTrack from '~/assets/images/track-embedded.svg';
import JavaTrack from '~/assets/images/track-java.svg';
import MobileTrack from '~/assets/images/track-mobile.svg';
import PythonTrack from '~/assets/images/track-python.svg';
import Uncertified from '~/assets/images/track-uncertified.svg';
import { SsafyTrack } from '~/services/member/utils';
import { inlineFlex } from '~/styles/utils';
import { defaultify } from '~/utils';

// SsafyTrack을 ~/services/member 에서 가져오면 참조 오류가 발생하는데 이유를 잘 모르겠습니다.
// import 구문 옆에다 주석 달면 린트 오류가 발생해서 여기 적어둡니다.

export interface TrackProps<Track extends keyof typeof tracks> {
  name?: Track | null;
  size?: TrackSize;
  style?: CSSProperties;
  theme?: Track extends 'fallback' | undefined ? FallbackTheme : undefined;
}

const Track = <T extends keyof typeof tracks>(props: TrackProps<T>) => {
  const { name = 'fallback', size = TrackSize.SM1, style = {}, theme } = props;
  const safeName = defaultify(name, [null]).to('fallback') as NonNullable<T>;

  const TrackComponent = tracks[safeName];

  return (
    <div css={selfCss}>
      <AccessibleIcon label={safeName}>
        <TrackComponent style={{ height: size, ...style }} theme={theme} />
      </AccessibleIcon>
    </div>
  );
};
export default Track;

const selfCss = css({ padding: 0 }, inlineFlex('center', 'center', 'row'));

type FallbackTheme = 'primary' | 'secondary';
const FallbackTrack = (props: {
  theme?: FallbackTheme;
  style?: CSSProperties;
}) => {
  const { theme = 'primary', style = {} } = props;
  const Component =
    theme === 'primary' ? PrimaryDefaultTrack : SecondaryDefaultTrack;
  return <Component style={style} />;
};

const tracks = {
  [SsafyTrack.EMBEDDED]: EmbeddedTrack,
  [SsafyTrack.PYTHON]: PythonTrack,
  [SsafyTrack.JAVA]: JavaTrack,
  [SsafyTrack.MOBILE]: MobileTrack,
  fallback: FallbackTrack, // 인증 O, 트랙 선택 X

  //
  uncertified: Uncertified, // 인증 X일 때,
};

export enum TrackSize {
  /** 12px */
  SM1 = '12px',

  /** 16px */
  SM2 = '16px',

  /** 32px */
  SM3 = '32px',

  /** 36px */
  SM4 = '36px',

  /** 126px */
  LG1 = '126px',

  /** 162px */
  LG2 = '162px',
}
