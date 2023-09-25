import type { ImageProps } from 'next/image';
import type { ComponentPropsWithoutRef } from 'react';

import Image from 'next/image';

import { useState } from 'react';

const initializeSrc = <T,>(fallbackSrc: string, src: T) => {
  if (!src) return fallbackSrc;
  return src;
};

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc: string;
}

export const ImageWithFallback = (props: ImageWithFallbackProps) => {
  const { src, fallbackSrc, alt, ...restProps } = props;
  const [imgSrc, setImgSrc] = useState(() => initializeSrc(fallbackSrc, src));

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
      {...restProps}
    />
  );
};

export interface NativeImageWithFallback
  extends ComponentPropsWithoutRef<'img'> {
  fallbackSrc: string;
}
export const NativeImageWithFallback = (props: NativeImageWithFallback) => {
  const { src, fallbackSrc, alt, ...restProps } = props;
  const [imgSrc, setImgSrc] = useState(() => initializeSrc(fallbackSrc, src));

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
      {...restProps}
    />
  );
};
