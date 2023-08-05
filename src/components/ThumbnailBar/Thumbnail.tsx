import Image from 'next/image';

import { css } from '@emotion/react';
import { memo } from 'react';
import { ClipLoader } from 'react-spinners';

import { Icon } from '~/components/Common';
import { colorMix, inlineFlex, palettes } from '~/styles/utils';

interface ThumbnailProps {
  src: string;
  alt: string;
  loading?: boolean;
  size?: number;
  onClickThumbnail?: () => void;
  onClickRemove?: () => void;
  disableRemove?: boolean;
}

const Thumbnail = (props: ThumbnailProps) => {
  const {
    src,
    alt,
    loading = false,
    size = defaultSize,
    onClickThumbnail,
    onClickRemove,
    disableRemove = false,
  } = props;

  const showRemoveButton = !disableRemove && !loading;

  return (
    <li css={[selfCss, loading && darkerCss]}>
      <div
        css={imageContainerCss}
        style={{ width: size, height: size }}
        onClick={onClickThumbnail}
        data-thumbnail=""
      >
        {loading && <ImageLoadIndicator />}
        <Image css={imageCss} src={src} alt={alt} width={size} height={size} />
      </div>
      {showRemoveButton && (
        <button type="button" css={removeButtonCss} onClick={onClickRemove}>
          <Icon name="close" size={12} label="썸네일 삭제" />
        </button>
      )}
    </li>
  );
};

const ImageLoadIndicator = () => {
  return (
    <div css={imageLoadIndicatorCss}>
      <ClipLoader color={palettes.white} size={30} />
    </div>
  );
};

export default memo(Thumbnail);

const defaultSize = 70;

const darkerCss = {
  '& [data-thumbnail]::after': {
    backgroundColor: colorMix('50%', palettes.black),
  },
};

const selfCss = css(
  {
    position: 'relative',
    ':hover': darkerCss,
  },
  inlineFlex('center', 'center')
);

const imageContainerCss = css(
  {
    border: `1px solid black`,
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

const imageLoadIndicatorCss = css({ position: 'absolute', zIndex: 10 });
