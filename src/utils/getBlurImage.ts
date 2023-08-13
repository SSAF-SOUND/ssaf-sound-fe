import { getPlaiceholder } from 'plaiceholder';

export const getBlurImage = async (imageUrl: string) => {
  const { base64 } = await getPlaiceholder(imageUrl);

  return { base64 };
};

export const getAllBlurImages = async (imageUrlArray: string[]) => {
  const blurImages = await Promise.all(imageUrlArray.map(getBlurImage));

  return blurImages.map((blurImage) => blurImage.base64);
};

const T = () => false;
