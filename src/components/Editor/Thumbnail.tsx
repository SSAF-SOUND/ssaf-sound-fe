import Image from 'next/image';

import { css } from '@emotion/react';
import { memo } from 'react';

import { Icon } from '~/components/Common';
import { colorMix, inlineFlex, palettes } from '~/styles/utils';

interface ThumbnailProps {
  src: string;
  alt: string;
  size?: number;
  onClickThumbnail?: () => void;
  onClickRemove?: () => void;
}

const Thumbnail = (props: ThumbnailProps) => {
  const {
    src,
    alt,
    size = defaultSize,
    onClickThumbnail,
    onClickRemove,
  } = props;

  return (
    <li css={selfCss}>
      <div
        css={imageContainerCss}
        style={{ width: size, height: size }}
        onClick={onClickThumbnail}
        data-thumbnail=""
      >
        <Image css={imageCss} src={src} alt={alt} width={size} height={size} />
      </div>
      <button type="button" css={removeButtonCss} onClick={onClickRemove}>
        <Icon name="close" size={12} label="썸네일 삭제" />
      </button>
    </li>
  );
};

export default memo(Thumbnail);

const defaultSize = 70;
const selfCss = css(
  {
    position: 'relative',
    ':hover': {
      '& [data-thumbnail]::after': {
        backgroundColor: colorMix('30%', palettes.black),
      },
    },
  },
  inlineFlex('center', 'center')
);

const imageContainerCss = css(
  {
    width: defaultSize,
    height: defaultSize,
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    borderRadius: 20,
    '::after': {
      transition: 'background-color 200ms',
      position: 'absolute',
      width: '100%',
      height: '100%',
      content: '""',
      display: 'block',
    },
  },
  inlineFlex('center', 'center')
);

const imageCss = css({ objectFit: 'cover' });

const removeButtonCss = css(
  {
    cursor: 'pointer',
    width: 20,
    height: 20,
    position: 'absolute',
    backgroundColor: palettes.grey4,
    borderRadius: '50%',
    top: -5,
    right: -5,
    border: `1px solid ${palettes.black}`,
    ':hover': {
      backgroundColor: palettes.white,
    },
  },
  inlineFlex('center', 'center')
);
