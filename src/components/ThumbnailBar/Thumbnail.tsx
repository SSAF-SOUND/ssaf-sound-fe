import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

import { Icon } from '~/components/Common/Icon';
import { useIsImageLoading } from '~/hooks/useIsImageLoading';
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

/**
 * - `loading`은 외부에서 강제로 설정할 수 있는 로딩상태 값입니다.
 * - `isImageLoading`은 실제 이미지의 로딩상태입니다.
 */
const Thumbnail = (props: ThumbnailProps) => {
  const {
    src,
    alt,
    loading = false,
    onClickThumbnail,
    onClickRemove,
    disableRemove = false,
  } = props;
  const isImageLoading = useIsImageLoading(src);
  const showSpinner = loading || isImageLoading;
  const showRemoveButton = !disableRemove && !showSpinner;
  const handleClickThumbnail = showSpinner ? undefined : onClickThumbnail;

  return (
    <li css={[selfCss, showSpinner && darkerCss]}>
      <button
        type="button"
        css={imageContainerCss}
        onClick={handleClickThumbnail}
        data-thumbnail=""
      >
        {showSpinner && <ImageLoadIndicator />}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img css={imageCss} src={src} alt={alt} />
      </button>
      {showRemoveButton && (
        <button type="button" css={removeButtonCss} onClick={onClickRemove}>
          <Icon name="close" size={16} label="썸네일 삭제" />
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

export default Thumbnail;

const defaultSize = 70;

const darkerCss = {
  '& [data-thumbnail]::after': {
    backgroundColor: colorMix('50%', palettes.black),
  },
};

const selfCss = css(
  {
    position: 'relative',
    zIndex: 1,
    ':hover': darkerCss,
  },
  inlineFlex('center', 'center')
);

const imageContainerCss = css(
  {
    border: `1px solid ${palettes.black}`,
    padding: 0,
    width: '100%',
    height: '100%',
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
    ':focus-visible': {
      outline: `4px solid ${palettes.primary.dark}`,
    },
  },
  inlineFlex('center', 'center')
);

const imageCss = css({
  objectFit: 'cover',
  minWidth: 140,
  minHeight: 140,
  width: 'min(180px, 35vw)',
  height: 'min(180px, 35vw)',
});

const removeButtonCss = css(
  {
    cursor: 'pointer',
    width: 30,
    height: 30,
    position: 'absolute',
    backgroundColor: palettes.grey4,
    borderRadius: '50%',
    top: -5,
    right: -5,
    border: `1px solid ${palettes.black}`,
    ':hover': {
      backgroundColor: palettes.white,
    },
    ':focus-visible': {
      outline: `4px solid ${palettes.primary.dark}`,
    },
  },
  inlineFlex('center', 'center')
);

const imageLoadIndicatorCss = css({
  position: 'absolute',
  zIndex: 1,
});
