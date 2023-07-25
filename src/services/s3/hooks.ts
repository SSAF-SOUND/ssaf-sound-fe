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

export interface ImageState {
  url?: string;
  thumbnailUrl: string;
}

export const useImageUpload = () => {
  const [images, setImages] = useState<ImageState[]>([]);
  const { mutateAsync: createPreSignedUrl } = useCreatePreSignedUrl();
  const { mutateAsync: uploadImageToS3, isLoading: isUploadingImageToS3 } =
    useUploadImageToS3();

  const uploadImage = async (file: File) => {
    const { preSignedUrl, imageDir } = await createPreSignedUrl();

    await uploadImageToS3({
      url: preSignedUrl,
      file,
    });

    return preSignedUrl + imageDir;
  };

  const handleImageUpload = async () => {
    openImageUploader({
      onLoadImage: async (file) => {
        const idx = images.length;

        setImages((prevImages) => [
          ...prevImages,
          { thumbnailUrl: URL.createObjectURL(file) },
        ]);

        const url = await uploadImage(file);

        setImages((prevImages) => {
          return produce(prevImages, (draft) => {
            draft[idx].url = url;
          });
        });
      },
      onError: (err) => {
        console.error('[In useImageUpload]:', err);
      },
    });
  };

  return {
    images,
    isUploading: isUploadingImageToS3,
    handleImageUpload,
  };
};
