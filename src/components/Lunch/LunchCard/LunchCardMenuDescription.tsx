import type { CSSProperties, ReactNode } from 'react';
import type { LunchMenuDetail } from '~/services/lunch';

import { css } from '@emotion/react';
import React, { memo, useState } from 'react';

import lunchImageFallback from '~/assets/images/lunch-image-fallback.png';
import { Button } from '~/components/Common/Button';
import { Icon } from '~/components/Common/Icon';
import { ImageWithFallback } from '~/components/Common/ImageWithFallback';
import { LunchCardOrder } from '~/components/Lunch/LunchCard/LunchCardOrder';
import { lunchCardMinHeight } from '~/components/Lunch/LunchCard/utils';
import { colorMix, flex, fontCss, palettes } from '~/styles/utils';

interface LunchCardMenuDescriptionProps {
  order: number;
  menu: LunchMenuDetail;
  className?: string;
  style?: CSSProperties;
}

const getPriorityValue = (order: number) => order <= 3;

export const LunchCardMenuDescription = memo(
  (props: LunchCardMenuDescriptionProps) => {
    const { order, menu, ...restProps } = props;
    const { imagePath, extraMenu, mainMenu, sumKcal } = menu;

    const [showDetailDescription, setShowDetailDescription] = useState(false);
    const onClickShowDetailToggleButton = () =>
      setShowDetailDescription((p) => !p);

    return (
      <div css={selfCss} {...restProps}>
        <LunchCardOrder order={order} css={{ zIndex: zIndex.order }} />

        <div css={imageLayerCss}>
          <ImageWithFallback
            css={imageCss}
            src={imagePath}
            alt={mainMenu}
            fallbackSrc={lunchImageFallback.src}
            priority={getPriorityValue(order)}
            fill={true}
          />
        </div>

        <div
          css={[
            descriptionCss,
            showDetailDescription && detailDescriptionContainerCss,
          ]}
        >
          {showDetailDescription && (
            <div css={detailDescriptionCss}>
              <MainMenu css={fontCss.style.B16}>{mainMenu}</MainMenu>
              <Button
                variant="literal"
                css={detailToggleButtonCss}
                onClick={onClickShowDetailToggleButton}
              >
                <Icon name="arrow.down" size={iconSize} />
                <span>간략히보기</span>
              </Button>
              <AdditionalInfo extraMenu={extraMenu} sumKcal={sumKcal} />
            </div>
          )}

          {!showDetailDescription && (
            <div>
              <MainMenu>{mainMenu}</MainMenu>
              <Button
                variant="literal"
                css={detailToggleButtonCss}
                onClick={onClickShowDetailToggleButton}
              >
                <Icon name="arrow.right" size={iconSize} />
                <span>자세히보기</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

LunchCardMenuDescription.displayName = 'LunchCardMenuDescription';

const zIndex = {
  image: 1,
  summaryDescription: 2,
  order: 3,
  detailDescription: 4,
};

const iconSize = 20;

const selfCss = css(
  {
    position: 'relative',
    width: '100%',
    minHeight: lunchCardMinHeight,
    height: '100%',
    userSelect: 'none',
  },
  flex()
);

const imageLayerCss = css({
  position: 'absolute',
  width: '100%',
  height: '100%',
  flexGrow: 1,
  zIndex: zIndex.image,
  backgroundColor: colorMix('90%', palettes.black),
});

const imageCss = css({
  display: 'block',
  objectFit: 'cover',
  opacity: 0.5,
  width: '100%',
  height: '100%',
});

const descriptionCss = css(
  {
    padding: 20,
    color: palettes.white,
    position: 'relative',
    flexGrow: 1,
    zIndex: zIndex.summaryDescription,
  },
  flex('flex-start', 'flex-end', 'column')
);

const detailDescriptionContainerCss = css(
  {
    zIndex: zIndex.detailDescription,
    backgroundColor: colorMix('50%', palettes.black),
  },
  flex('flex-start', 'flex-start', 'column')
);

const detailDescriptionCss = css(
  {
    flexGrow: 1,
  },
  flex('flex-start', '', 'column')
);

const detailToggleButtonCss = css(
  {
    color: palettes.primary.default,
    padding: 0,
    height: 24,
  },
  fontCss.style.B16,
  flex('center', '', 'row', 4)
);

interface MainMenuProps {
  children: ReactNode;
  className?: string;
}
const MainMenu = (props: MainMenuProps) => {
  return <h3 css={mainMenuCss} {...props} />;
};

const mainMenuCss = css({ marginBottom: 8 }, fontCss.style.B20);

interface AdditionalInfoProps {
  extraMenu: string;
  sumKcal: string;
}

const AdditionalInfo = (props: AdditionalInfoProps) => {
  const { extraMenu, sumKcal } = props;
  return (
    <div css={additionalInfoCss}>
      <p>{extraMenu}</p>
      <p>총 칼로리: {sumKcal}</p>
    </div>
  );
};

const additionalInfoCss = css(
  fontCss.style.R14,
  flex('', 'space-between', 'column', 10),
  { paddingLeft: iconSize, flexGrow: 1, marginTop: 4, wordBreak: 'break-all' }
);
