import type { LunchMenuDetail } from '~/services/lunch';

import { css } from '@emotion/react';
import * as RadixToggle from '@radix-ui/react-toggle';

import lunchImageFallback from '~/assets/images/lunch-image-fallback.png';
import { Icon } from '~/components/Common/Icon';
import { ImageWithFallback } from '~/components/Common/ImageWithFallback';
import { flex, fontCss, palettes, resetStyle } from '~/styles/utils';

export interface LunchMenusPreviewMenuDescriptionProps {
  menu: LunchMenuDetail;
}

const imageSize = 110;

export const LunchMenusPreviewMenuDescription = (
  props: LunchMenusPreviewMenuDescriptionProps
) => {
  const { menu } = props;
  const { mainMenu, imagePath } = menu;
  return (
    <div css={selfCss}>
      <div css={likeLayerCss}>
        <Icon name="like" size={16} color={palettes.primary.dark} />
        <strong>{menu.pollCount}</strong>
      </div>

      <RadixToggle.Root type="button" css={buttonCss}>
        <div css={imageContainerCss} className={cn.imageContainer}>
          <ImageWithFallback
            className={cn.image}
            css={imageCss}
            src={imagePath}
            fallbackSrc={lunchImageFallback.src}
            alt={mainMenu}
            width={imageSize}
            height={imageSize}
            priority={true}
          />

          <strong className={cn.mainMenu} css={mainMenuCss}>
            {mainMenu}
          </strong>
        </div>
      </RadixToggle.Root>
    </div>
  );
};

const cn = {
  imageContainer: 'lunch-preview-menu-image-container',
  image: 'lunch-preview-menu-image',
  mainMenu: 'lunch-preview-menu-main-menu',
};

const selfCss = css({ padding: '4px 0' }, flex('center', '', 'column', 4));

const likeLayerCss = css(flex('center', '', 'row'), fontCss.style.B16);

const imageContainerCss = css({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '50%',
  transition: 'background-color 200ms',
});

const imageCss = css({
  display: 'block',
  objectFit: 'cover',
  transition: 'opacity 200ms',
  opacity: 1,
});

const mainMenuCss = css(
  {
    display: 'block',
    position: 'absolute',
    wordBreak: 'break-all',
    padding: 4,
    color: palettes.white,
    opacity: 0,
    width: '100%',
    height: '100%',
    top: 0,
    transition: 'opacity 200ms',
    textAlign: 'center',
  },
  flex('center', 'center'),
  fontCss.style.B12
);

const buttonCss = css(resetStyle.button(), {
  borderRadius: '50%',
  whiteSpace: 'initial',
  '&[data-state="on"]': {
    backgroundColor: palettes.black,
    [`& .${cn.image}`]: {
      opacity: 0.5,
    },
    [`& .${cn.mainMenu}`]: {
      opacity: 1,
    },
  },
  '&:focus-visible': {
    outline: `2px solid ${palettes.primary.dark}`,
  },
});
