import { css } from '@emotion/react';
import { useCallback, useState } from 'react';
import { TransformWrapper } from 'react-zoom-pan-pinch';

import { Icon, IconButton } from '~/components/Common';
import { colorMix, flex, palettes, position } from '~/styles/utils';

import ImageLayer from './ImageLayer';

export interface ViewerMainProps {
  src: string;
  alt?: string;
}

const ViewerMain = (props: ViewerMainProps) => {
  const { src, alt = '' } = props;
  const [minScale, setMinScale] = useState(0.1);
  const maxScale = 2;
  const scaleStep = 0.4;

  const onResizeWindow = useCallback((scale: number) => setMinScale(scale), []);

  return (
    <TransformWrapper
      initialScale={minScale}
      maxScale={maxScale}
      minScale={minScale}
      wheel={{ disabled: true }}
      doubleClick={{ disabled: true }}
      centerOnInit={true}
      limitToBounds={false}
    >
      {(transformHandlers) => {
        const { zoomIn, zoomOut, centerView } = transformHandlers;

        return (
          <>
            <div css={viewerMainCss}>
              <ImageLayer
                src={src}
                alt={alt}
                transformHandlers={transformHandlers}
                onResizeWindow={onResizeWindow}
              />
            </div>

            <div css={viewerToolbarCss}>
              <IconButton
                size={iconButtonSize}
                onClick={() => zoomOut(scaleStep, 100)}
              >
                <Icon name="minus" size={iconSize} />
              </IconButton>

              <IconButton
                size={iconButtonSize}
                onClick={() => zoomIn(scaleStep, 100)}
              >
                <Icon name="plus" size={iconSize} />
              </IconButton>

              <IconButton
                size={iconButtonSize}
                onClick={() => centerView(minScale)}
              >
                <Icon name="refresh" size={iconSize} />
              </IconButton>
            </div>
          </>
        );
      }}
    </TransformWrapper>
  );
};

export default ViewerMain;

const iconButtonSize = 34;
const iconSize = 28;

const viewerToolbarCss = css(
  {
    overflow: 'hidden',
    bottom: 10,
    padding: 10,
    backgroundColor: colorMix('70%', palettes.grey0),
    borderRadius: 24,
  },
  flex('center', 'center', 'row', 10),
  position.x('center', 'absolute')
);

const viewerMainCss = css({
  height: '92%',
});
