import { getPlaiceholder } from 'plaiceholder';

export const getBlurImage = async (imageUrl: string) => {
  const { base64 } = await getPlaiceholder(imageUrl);

  return { base64 };
};

export const getAllBlurImages = async (imageUrlArray: string[]) => {
  const blurImages = await Promise.all(imageUrlArray.map(getBlurImage));

  return blurImages.map((blurImage) => blurImage.base64);
};

// re-export 사용시 child-process 관련 오류가 일어나는데,
// 해당 방법의 수정 사항이 package.json을 건드는 방법이라 우선 건너갑니다!
