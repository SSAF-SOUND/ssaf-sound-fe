import Image from 'next/image';

import { css } from '@emotion/react';
import { memo } from 'react';

import { colorMix, inlineFlex, palettes } from '~/styles/utils';

interface ThumbnailProps {
  src: string;
  alt: string;
  size?: number;
  onClick?: () => void;
}

const Thumbnail = (props: ThumbnailProps) => {
  const { src, alt, size = defaultSize, onClick } = props;

  return (
    <div css={selfCss} style={{ width: size, height: size }} onClick={onClick}>
      <Image css={imageCss} src={src} alt={alt} width={size} height={size} />
    </div>
  );
};

export default memo(Thumbnail);

const defaultSize = 80;
const selfCss = css(
  {
    position: 'relative',
    borderRadius: 20,
    width: defaultSize,
    height: defaultSize,
    overflow: 'hidden',
    cursor: 'pointer',
    '::after': {
      transition: 'background-color 200ms',
      position: 'absolute',
      width: defaultSize,
      height: defaultSize,
      content: '""',
      display: 'block',
    },
    ':hover': {
      '::after': {
        backgroundColor: colorMix('30%', palettes.black),
      },
    },
  },
  inlineFlex()
);

const imageCss = css({ objectFit: 'cover' });
