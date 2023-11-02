import * as Sentry from '@sentry/nextjs';
import { isAxiosError } from 'axios';
import { produce } from 'immer';
import { useState } from 'react';

import { useCreatePreSignedUrl, useUploadImageToS3 } from '~/services/s3/hooks';
import { openImageUploader } from '~/services/s3/utils';
import { customToast } from '~/utils/customToast';
import { handleAxiosError } from '~/utils/handleAxiosError';

export interface UseImageUploadOptions {
  maxImageCount: number;
  initialImages: ImageState[] | (() => ImageState[]);
}

export interface ImageState {
  /** 서버에 이미지 업로드가 완료되면 `imageUrl`이 할당됩니다. (`imageUrl`로 로딩 상태 판단 가능) */
  imageUrl?: string;
  /** `imageUrl`에서 이미지가 저장된 `Path`부분으로, 삭제할 때 필요하기 때문에 게시글 작성 시 서버에 전달해야 합니다. */
  imagePath?: string;
  /** `thumbnailUrl`은 업로드한 이미지의 `objectUrl`이 생성되어 즉시 할당됩니다. */
  thumbnailUrl: string;
}

const createMaxUploadCountExceededErrorMessage = (maxCount: number) =>
  `이미지는 최대 ${maxCount}개 까지 업로드할 수 있습니다.`;

export const useImageUpload = (
  options: Partial<UseImageUploadOptions> = {}
) => {
  const { maxImageCount = 3, initialImages = () => [] } = options;
  const [isConverting, setIsConverting] = useState(false);
  const [images, setImages] = useState<ImageState[]>(initialImages);
  const { mutateAsync: createPreSignedUrl, isLoading: isCreatingPreSignedUrl } =
    useCreatePreSignedUrl();
  const { mutateAsync: uploadImageToS3, isLoading: isUploadingImageToS3 } =
    useUploadImageToS3();

  const isUploading =
    isConverting || isCreatingPreSignedUrl || isUploadingImageToS3;

  const uploadImage = async (file: File) => {
    if (maxImageCount <= images.length) {
      throw createMaxUploadCountExceededErrorMessage(maxImageCount);
    }

    const index = images.length;

    try {
      setImages((prevImages) =>
        produce(prevImages, (draft) => {
          draft[index] = { thumbnailUrl: URL.createObjectURL(file) };
        })
      );

      const { preSignedUrl, imageUrl, imagePath } = await createPreSignedUrl();

      await uploadImageToS3({
        url: preSignedUrl,
        file,
      });

      setImages((prevImages) =>
        produce(prevImages, (draft) => {
          draft[index].imageUrl = imageUrl;
          draft[index].imagePath = imagePath;
        })
      );
    } catch (err) {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
      throw err;
    }
  };

  const handleOpenImageUploader = () => {
    if (maxImageCount <= images.length) {
      customToast.clientError(
        createMaxUploadCountExceededErrorMessage(maxImageCount)
      );
      return;
    }

    openImageUploader({
      onConvertStart: () => setIsConverting(true),
      onConvertEnd: () => setIsConverting(false),
      onLoadImage: async (file) => {
        await uploadImage(file);
      },
      onError: (err) => {
        if (typeof err === 'string') {
          customToast.clientError(err);
        }

        if (isAxiosError(err)) {
          handleAxiosError(err);
          return;
        }

        console.error(err);
        Sentry.captureException(err);
      },
    });
  };

  return {
    images,
    setImages,
    isUploading,
    handleOpenImageUploader,
    isConverting,
  };
};
