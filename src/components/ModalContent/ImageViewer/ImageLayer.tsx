import type { ReactZoomPanPinchHandlers } from 'react-zoom-pan-pinch';

import { css } from '@emotion/react';
import { useLayoutEffect, useRef } from 'react';
import { TransformComponent } from 'react-zoom-pan-pinch';

import { flex } from '~/styles/utils';

export interface ImageLayerProps {
  src: string;
  alt?: string;
  transformHandlers: ReactZoomPanPinchHandlers;
  onResizeWindow: (scale: number) => void;
}

const transformerClassname = 'image-transformer';

const ImageLayer = (props: ImageLayerProps) => {
  const { src, alt = '', transformHandlers, onResizeWindow } = props;
  const imageRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!imageRef.current || !imageContainerRef.current) return;

    const onResize = handleResize(imageRef.current, imageContainerRef.current, {
      scaleFactor: 0.5,
      onCalculateScale: (scale) => {
        transformHandlers.centerView(scale, 0);
        onResizeWindow(scale);
      },
    });

    onResize();

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [src, transformHandlers, onResizeWindow]);

  return (
    <div css={imageContainerCss} ref={imageContainerRef}>
      <TransformComponent wrapperClass={transformerClassname}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} ref={imageRef} />
      </TransformComponent>
    </div>
  );
};

interface HandleResizeOptions {
  /** `scale`계산 이후 호출할 콜백함수 */
  onCalculateScale: (scale: number) => void;
  /** 계산된 `scale`에 곱할 상수 */
  scaleFactor: number;
}

type HandleResize = (
  target: HTMLImageElement,
  container: HTMLElement,
  options?: Partial<HandleResizeOptions>
) => (e?: UIEvent) => void;

const handleResize: HandleResize =
  (target, container, options = {}) =>
  () => {
    const { onCalculateScale, scaleFactor = 1 } = options;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const scaleX = containerWidth / target.naturalWidth;
    const scaleY = containerHeight / target.naturalHeight;
    const scale = Math.min(scaleX, scaleY) * scaleFactor;

    onCalculateScale?.(scale);
  };

export default ImageLayer;

const imageContainerCss = css(
  {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    [`& .${transformerClassname}`]: {
      userSelect: 'none',
      width: '100%',
      height: '100%',
      ':active': {
        cursor: 'grabbing',
      },
    },
  },
  flex('center', 'center', 'row')
);
