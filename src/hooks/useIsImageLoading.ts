import { useEffect, useState } from 'react';

export const useIsImageLoading = (src: string) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  useEffect(() => {
    if (src) {
      const $image = new Image();
      $image.src = src;
      $image.onload = () => setIsImageLoading(false);
    }
  }, [src]);

  return isImageLoading;
};
