import { MB, byteToMB, ALLOWED_IMAGE_TYPES } from '~/utils/toWebp';

const LIMIT_FILE_SIZE = MB * 10; /* byte */
const allowedImageTypesSet = new Set(ALLOWED_IMAGE_TYPES);

export interface UploadImageToBrowserOptions {
  onLoadImage: (loaded: File) => void | Promise<void>;
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
    const { onLoadImage, onSettled, onError } = options;

    const $target = e.target as HTMLInputElement;
    if (!$target.files) return;

    const file = $target.files[0];

    if (!allowedImageTypesSet.has(file.type)) {
      throw '파일 타입이 유효하지 않습니다.';
    }

    if (file.size > LIMIT_FILE_SIZE) {
      throw `파일 크기는 ${byteToMB(LIMIT_FILE_SIZE)}MB 보다 작아야 합니다.`;
    }

    try {
      await onLoadImage?.(file);
    } catch (err) {
      onError?.(err);
    } finally {
      onSettled?.();
    }
  };
