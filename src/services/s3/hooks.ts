import { useMutation } from '@tanstack/react-query';
import { produce } from 'immer';
import { useState } from 'react';

import { customToast, handleAxiosError } from '~/utils';

import { createPreSignedUrl, uploadImageToS3 } from './apis';
import { openImageUploader } from './utils';

const useCreatePreSignedUrl = () => {
  return useMutation({
    mutationFn: createPreSignedUrl,
    onError: (error) => {
      console.error('[In useCreatePreSignedUrl]:', error);
    },
  });
};

const useUploadImageToS3 = () => {
  return useMutation({
    mutationFn: uploadImageToS3,
    onError: (error) => {
      console.error('[In useUploadImageToS3]:', error);
    },
  });
};

export interface UseImageUploadOptions {
  maxImageCount: number;
  initialImages: ImageState[] | (() => ImageState[]);
}

export interface ImageState {
  /** 서버에 이미지 업로드가 완료되면 `url`이 할당된다. (`url`로 로딩 상태 판단 가능) */
  url?: string;
  /** `thumbnailUrl`은 업로드한 이미지의 `objectUrl`이 생성되어 즉시 할당된다. */
  thumbnailUrl: string;
}

const exceedMaxCountErrorMessage = (maxCount: number) =>
  `이미지는 최대 ${maxCount}개 까지 업로드할 수 있습니다.`;

export const useImageUpload = (
  options: Partial<UseImageUploadOptions> = {}
) => {
  const { maxImageCount = 3, initialImages = () => [] } = options;
  const [images, setImages] = useState<ImageState[]>(initialImages);
  const { mutateAsync: createPreSignedUrl, isLoading: isCreatingPreSignedUrl } =
    useCreatePreSignedUrl();
  const { mutateAsync: uploadImageToS3, isLoading: isUploadingImageToS3 } =
    useUploadImageToS3();

  const isUploading = isCreatingPreSignedUrl || isUploadingImageToS3;

  const uploadImage = async (file: File) => {
    if (maxImageCount <= images.length) {
      throw exceedMaxCountErrorMessage(maxImageCount);
    }

    const index = images.length;

    try {
      setImages((prevImages) =>
        produce(prevImages, (draft) => {
          draft[index] = { thumbnailUrl: URL.createObjectURL(file) };
        })
      );

      const { preSignedUrl, imageDir } = await createPreSignedUrl();

      await uploadImageToS3({
        url: preSignedUrl,
        file,
      });

      setImages((prevImages) =>
        produce(prevImages, (draft) => {
          draft[index].url = imageDir;
        })
      );
    } catch (err) {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
      throw err;
    }
  };

  const handleOpenImageUploader = () => {
    if (maxImageCount <= images.length) {
      customToast.clientError(exceedMaxCountErrorMessage(maxImageCount));
      return;
    }

    openImageUploader({
      onLoadImage: async (file) => {
        await uploadImage(file);
      },
      onError: (err) => {
        if (typeof err === 'string') {
          customToast.clientError(err);
        } else {
          handleAxiosError(err);
        }
      },
    });
  };

  return {
    images,
    setImages,
    isUploading,
    handleOpenImageUploader,
  };
};
