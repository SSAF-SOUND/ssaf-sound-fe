import { useMutation } from '@tanstack/react-query';
import { produce } from 'immer';
import { useState } from 'react';

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
}

export interface ImageState {
  url?: string;
  thumbnailUrl: string;
}

export const useImageUpload = (
  options: Partial<UseImageUploadOptions> = {}
) => {
  const { maxImageCount = 3 } = options;
  const [images, setImages] = useState<ImageState[]>([]);
  const { mutateAsync: createPreSignedUrl } = useCreatePreSignedUrl();
  const { mutateAsync: uploadImageToS3, isLoading: isUploadingImageToS3 } =
    useUploadImageToS3();

  const uploadImage = async (file: File) => {
    const idx = images.length;
    try {
      setImages((prevImages) => [
        ...prevImages,
        { thumbnailUrl: URL.createObjectURL(file) },
      ]);

      const { preSignedUrl, imageDir } = await createPreSignedUrl();

      await uploadImageToS3({
        url: preSignedUrl,
        file,
      });

      setImages((prevImages) =>
        produce(prevImages, (draft) => {
          draft[idx].url = preSignedUrl + imageDir;
        })
      );
    } catch (err) {
      setImages((prevImages) => prevImages.filter((_, i) => i !== idx));
    }
  };

  const handleOpenImageUploader = () => {
    if (maxImageCount <= images.length) {
      console.error(
        `이미지는 최대 ${images.length}개 까지 업로드할 수 있습니다.`
      );
      return;
    }

    if (isUploadingImageToS3) {
      console.error('여러 이미지 업로드를 동시에 할 수 없습니다.');
      return;
    }

    openImageUploader({
      onLoadImage: async (file) => {
        await uploadImage(file);
      },
      onError: (err) => {
        console.error('[In openImageUploader]:', err);
      },
    });
  };

  return {
    images,
    isUploading: isUploadingImageToS3,
    handleOpenImageUploader,
  };
};
