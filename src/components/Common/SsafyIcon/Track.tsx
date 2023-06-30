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
import { MajorType } from '~/services/member';
import { inlineFlex } from '~/styles/utils';

export interface TrackProps<Track extends keyof typeof tracks> {
  /**
   * API 명세에 `null`이 들어올 수 있다고 되어있는데
   * 만약 그렇다면 `fetcher`에서 `null`을 `undefined`로 변환할 예정입니다.
   */
  name?: Track;
  label?: string;
  size?: TrackSize;
  style?: CSSProperties;
  theme?: Track extends 'fallback' | undefined ? FallbackTheme : undefined;
}

const Track = <T extends keyof typeof tracks>(props: TrackProps<T>) => {
  const {
    name = 'fallback',
    label = name,
    size = TrackSize.SM1,
    style = {},
    theme,
  } = props;

  const TrackComponent = tracks[name];

  return (
    <div css={selfCss}>
      <AccessibleIcon label={label}>
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
  [MajorType.EMBEDDED]: EmbeddedTrack,
  [MajorType.PYTHON]: PythonTrack,
  [MajorType.JAVA]: JavaTrack,
  [MajorType.MOBILE]: MobileTrack,
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
