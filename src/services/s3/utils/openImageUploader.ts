import * as Sentry from '@sentry/nextjs';

import { customToast } from '~/utils/customToast';
import { toWebp, MB, byteToMB, ALLOWED_IMAGE_TYPES } from '~/utils/toWebp';

const LIMIT_FILE_SIZE = MB * 10; /* byte */
const QUALITY = 0.5;
const allowedImageTypesSet = new Set(ALLOWED_IMAGE_TYPES);

export interface UploadImageToBrowserOptions {
  onConvertStart: () => void;
  onConvertEnd: () => void;
  onLoadImage: (
    loaded: Awaited<ReturnType<typeof toWebp>>
  ) => void | Promise<void>;
  onError: (reason: unknown) => void;
  onSettled: () => void;
}

export type OpenImageUploader = (
  options?: Partial<UploadImageToBrowserOptions>
) => void;

export const openImageUploader: OpenImageUploader = (options = {}) => {
  const $input = document.createElement('input');
  $input.setAttribute('type', 'file');
  $input.setAttribute('accept', ALLOWED_IMAGE_TYPES.join(', '));
  $input.click();
  $input.addEventListener('change', handleUploadToBrowser(options));
};

type HandleUploadImageToBrowser = (
  options?: Partial<UploadImageToBrowserOptions>
) => (e: Event) => void;

const handleUploadToBrowser: HandleUploadImageToBrowser =
  (options = {}) =>
  async (e) => {
    const { onConvertStart, onConvertEnd, onLoadImage, onSettled, onError } =
      options;

    const $target = e.target as HTMLInputElement;
    if (!$target.files) return;

    const file = $target.files[0];

    if (!allowedImageTypesSet.has(file.type)) {
      throw '파일 타입이 유효하지 않습니다.';
    }

    try {
      onConvertStart?.();

      const isWebp = file.type === 'image/webp';

      const convertPromise = isWebp
        ? Promise.resolve(file)
        : toWebp(file, {
            quality: QUALITY,
          }).finally(() => onConvertEnd?.());

      customToast.promise(convertPromise, {
        loading: '이미지 압축중...',
      });

      const convertedFile = await convertPromise;

      if (convertedFile.size > LIMIT_FILE_SIZE) {
        if (convertedFile.size > file.size) {
          Sentry.captureException(
            new Error(
              `변환 전 용량이 변환 후 용량보다 작음.\n변환전: ${JSON.stringify(
                file
              )}\n변환후: ${JSON.stringify(convertedFile)}`
            )
          );
        } else
          Sentry.captureException(
            new Error(`이미지 용량 초과 ${JSON.stringify(convertedFile)}`)
          );

        throw `파일 크기는 ${byteToMB(LIMIT_FILE_SIZE)}MB 보다 작아야 합니다.`;
      }

      await onLoadImage?.(convertedFile);
    } catch (err) {
      onError?.(err);
    } finally {
      onSettled?.();
    }
  };
