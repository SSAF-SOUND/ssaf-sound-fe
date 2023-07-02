import { css } from '@emotion/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Icon, IconButton, Modal } from '~/components/Common';
import { flex, palettes } from '~/styles/utils';

interface ImageViewerProps {
  src: string;
  alt?: string;
  onClickClose?: () => void;
}

const ImageViewer = (props: ImageViewerProps) => {
  const { src, alt = '', onClickClose } = props;
  const [currentScale, setCurrentScale] = useState<number>();
  const [optimizedScale, setOptimizedScale] = useState<number>();
  const hasScale = !!currentScale;

  const imageRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (!imageRef.current || !imageContainerRef.current) return;
    imageRef.current.width = imageRef.current.naturalWidth;
    imageRef.current.height = imageRef.current.naturalHeight;

    const onResize = handleResize(imageRef.current, imageContainerRef.current, {
      onCalculateScale: (scale) => {
        setCurrentScale(scale);
        setOptimizedScale(scale);
      },
      scaleFactor: 0.5,
    });

    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [src]);

  useEffect(() => {
    if (!imageRef.current) return;
    const $image = imageRef.current;
    setTimeout(() => {
      $image.style.transition = `transform 200ms`;
    }, 500);
  }, [hasScale]);

  return (
    <div css={selfCss}>
      <div css={viewerHeaderCss}>
        <Modal.Close asChild>
          <IconButton size={34} onClick={onClickClose}>
            <Icon name="close" size={28} />
          </IconButton>
        </Modal.Close>
      </div>
      <div css={viewerMainCss}>
        <div css={imageContainerCss} ref={imageContainerRef}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            draggable={false}
            css={imageCss}
            src={src}
            alt={alt}
            ref={imageRef}
            style={{
              transform: `scale(${currentScale}, ${currentScale})`,
            }}
          />
        </div>
      </div>
      <div css={viewerFooterCss}>d</div>
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

export default ImageViewer;

const selfCss = css(
  {
    position: 'fixed',
    inset: 30,
    backgroundColor: palettes.grey0,
    border: `1px solid ${palettes.grey1}`,
    borderRadius: 16,
  },
  flex('', '')
);

const viewerHeaderCss = css(
  {
    flexGrow: 1,
    padding: '0 10px',
    borderBottom: `1px solid ${palettes.grey1}`,
  },
  flex('center', 'flex-end', 'row')
);

const viewerFooterCss = css(
  {
    flexGrow: 2,
  },
  flex('center', '', 'row')
);

const viewerMainCss = css({
  height: '90%',
  padding: '40px 20px',
});

const imageContainerCss = css(
  {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  flex('center', 'center', 'row')
);

const imageCss = css({
  userSelect: 'none',
});
