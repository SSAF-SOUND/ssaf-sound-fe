import { useEffect } from 'react';

import Editor from '~/components/Editor';
import { useArticleFormContext } from '~/components/Forms/ArticleForm/utils';
import { useImageUpload } from '~/services/s3/hooks';

const fieldName = 'images';
const maxImageCount = 3;
const validateImages = (value: string[]) => {
  if (value.length > maxImageCount)
    return `한 번에 업로드할 수 있는 최대 이미지의 개수는 ${maxImageCount}개 입니다.`;
};

export const ArticleImages = () => {
  const { register, setValue } = useArticleFormContext();
  const { images, setImages, handleOpenImageUploader, isUploading } =
    useImageUpload({
      maxImageCount,
    });

  const removeImageByIndex = (index: number) =>
    setImages((p) => p.filter((_, i) => i !== index));

  const hasImages = images.length > 0;

  const thumbnails = images.map(({ thumbnailUrl, url }) => {
    return {
      loading: !url,
      thumbnailUrl,
    };
  });

  register(fieldName, {
    validate: validateImages,
  });

  useEffect(() => {
    const fieldValues = images.map(({ url }) => url || '');
    setValue(fieldName, fieldValues, {
      shouldDirty: true,
    });
  }, [images, setValue]);

  return (
    <div>
      {hasImages && (
        <Editor.ThumbnailBar
          thumbnails={thumbnails}
          onClickRemoveThumbnail={removeImageByIndex}
          disableRemove={isUploading}
        />
      )}

      <Editor.ToolBar>
        <Editor.ToolBarItem name="image" onClick={handleOpenImageUploader} />
      </Editor.ToolBar>
    </div>
  );
};
