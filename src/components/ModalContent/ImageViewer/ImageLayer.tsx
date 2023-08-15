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

    /*
      NOTE:

      이미지가 로드되기 전에, `naturalWidth`, `naturalHeight`를 참조하면 0이 나올 수 있습니다.
      결과적으로 `scaleX`, `scaleY`가 `Infinity`가 되고, scale 관련 버그가 발생합니다.

      현재까지 알아낸 원인
      - 썸네일바에 있는 이미지를 클릭하면 이미지 뷰어가 열림
      - 썸네일바에 있는 이미지 `src`와 이미지 뷰어에서 보여주는 이미지의 `src`가 다르면, 이미지 뷰어를 열 때, 같은 내용의 이미지라도 다시 로드를 시작.
      - 썸네일바에 있는 이미지는 `next/image`를 사용하고, 이미지 뷰어에 있는 이미지는 기본 `img`엘리먼트를 사용했기 때문에 `src`가 달라져서 발생한 것으로 보임.


      썸네일바의 이미지와 이미지뷰어의 이미지 모두 기본 `img`엘리먼트 사용하면 `src`가 동일해져서 `naturalWidth`, `naturalHeight`가 항상 제대로 계산됨 (이미지 뷰어는 무조건 썸네일바의 이미지가 로드되었을 때 열 수 있으므로)
     */

    const safeScale = Number.isFinite(scale) ? scale : 0.3;
    onCalculateScale?.(safeScale);
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
