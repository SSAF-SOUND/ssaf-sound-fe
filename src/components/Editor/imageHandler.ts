import { toWebp, MB, byteToMB } from '~/utils/toWebp';

const LIMIT_FILE_SIZE = MB * 10; /* byte */
const ACCEPTS = 'image/webp, image/png, image/jpeg, image/jpg, image/gif';
const QUALITY = 0.5;

export interface ImageHandlerOptions {
  onUploadStart: () => void;
  onUploadSuccess: (imageValues: Awaited<ReturnType<typeof toWebp>>) => void;
  onUploadError: (reason: string) => void;
  onUploadSettled: () => void;
}

export type ImageHandler = (options?: Partial<ImageHandlerOptions>) => void;

export const imageHandler: ImageHandler = (options = {}) => {
  const $input = document.createElement('input');
  $input.setAttribute('type', 'file');
  $input.setAttribute('accept', ACCEPTS);
  $input.click();
  $input.addEventListener('change', handleUploadImage(options));
};

type HandleUploadImage = (
  options?: Partial<ImageHandlerOptions>
) => (e: Event) => void;

const handleUploadImage: HandleUploadImage =
  (options = {}) =>
  (e) => {
    const { onUploadStart, onUploadSuccess, onUploadSettled, onUploadError } =
      options;

    const $target = e.target as HTMLInputElement;
    if (!$target.files) return;

    onUploadStart?.(); // upload 시작
    const file = $target.files[0];
    const fileSize = file.size;

    if (fileSize > LIMIT_FILE_SIZE) {
      onUploadError?.(
        `파일 크기는 ${byteToMB(fileSize)}MB 보다 작아야 합니다.`
      );
      return;
    }

    toWebp(file, { maxWebpSize: LIMIT_FILE_SIZE, quality: QUALITY })
      .then((data) => onUploadSuccess?.(data))
      .catch((e: unknown) => {
        if (typeof e === 'string') {
          onUploadError?.(e);
          return;
        }
        console.error('Unknown Error', e);
      })
      .finally(() => onUploadSettled?.());
  };
