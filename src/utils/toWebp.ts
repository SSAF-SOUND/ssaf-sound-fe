export const MB = (1 << 10) << 10;
export const byteToMB = (byte: number) => {
  return (byte / MB).toFixed(2);
};

export const ALLOWED_IMAGE_TYPES = [
  'image/webp',
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/gif',
];

export interface ToWebpOptions {
  maxWebpSize: number;
  quality: number;
}

type ToWebp = (
  file: File,
  options?: Partial<ToWebpOptions>
) => Promise<{ blob: Blob; src: string }>;

/* https://github.com/juunini/webp-converter-browser/blob/main/src/index.ts */
export const toWebp: ToWebp = (file, options = {}) =>
  new Promise((resolve, reject) => {
    const { maxWebpSize = MB, quality = 0.8 } = options;

    if (
      ![
        'image/webp',
        'image/png',
        'image/jpg',
        'image/jpeg',
        'image/gif',
      ].includes(file.type)
    ) {
      reject('파일 타입이 유효하지 않습니다.');
      return;
    }

    const URL = window.URL;
    const objectUrl = URL.createObjectURL(file);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    const image = new Image();

    image.src = objectUrl;
    image.crossOrigin = 'anonymous';
    image.onerror = () => reject('이미지 로드에 실패했습니다.');
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (data) => {
          const blob = data as Blob;
          if (blob.size > maxWebpSize) {
            reject(
              `파일 크기는 ${byteToMB(maxWebpSize)}MB 보다 작아야 합니다.`
            );
          }

          resolve({ blob, src: objectUrl });
        },
        'image/webp',
        quality
      );
    };
  });
