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
import { inlineFlex } from '~/styles/utils';

const tracks = {
  uncertified: <Uncertified />,
  embedded: <EmbeddedTrack />,
  python: <PythonTrack />,
  java: <JavaTrack />,
  mobile: <MobileTrack />,
  primaryDefault: <PrimaryDefaultTrack />,
  secondaryDefault: <SecondaryDefaultTrack />,
};

type TrackSize = 10 | 15 | 32 | 36 | 126;

interface TrackProps {
  name: keyof typeof tracks;
  label?: string;
  size?: TrackSize;
  style?: CSSProperties;
}

const Track = (props: TrackProps) => {
  const { name, label = name, size = 32, style = {} } = props;
  return (
    <div css={selfCss} style={{ height: size, ...style }}>
      <AccessibleIcon label={label}>{tracks[name]}</AccessibleIcon>
    </div>
  );
};
export default Track;

const selfCss = css({ padding: 4 }, inlineFlex());
