import { toWebp, MB, byteToMB, ALLOWED_IMAGE_TYPES } from '~/utils';

const LIMIT_FILE_SIZE = MB * 10; /* byte */
const QUALITY = 0.5;

export interface UploadImageToBrowserOptions {
  onUploadStart: () => void;
  onUploadSuccess: (imageValues: Awaited<ReturnType<typeof toWebp>>) => void;
  onUploadError: (reason: string) => void;
  onUploadSettled: () => void;
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
    const { onUploadStart, onUploadSuccess, onUploadSettled, onUploadError } =
      options;

    const $target = e.target as HTMLInputElement;
    if (!$target.files) return;
    onUploadStart?.();

    const file = $target.files[0];

    try {
      const webp = await fileToWebp(file);
      onUploadSuccess?.(webp);
    } catch (err) {
      if (typeof err === 'string') {
        onUploadError?.(err);
        return;
      }
      console.error('[In fileToWebp]: Unknown Error', err);
    } finally {
      onUploadSettled?.();
    }
  };

export const fileToWebp = async (file: File) => {
  const { type, size } = file;

  if (!ALLOWED_IMAGE_TYPES.includes(type))
    throw '파일 타입이 유효하지 않습니다.';

  if (size > LIMIT_FILE_SIZE) {
    throw `파일 크기는 ${byteToMB(size)}MB 보다 작아야 합니다.`;
  }

  return toWebp(file, { maxWebpSize: LIMIT_FILE_SIZE, quality: QUALITY });
};
