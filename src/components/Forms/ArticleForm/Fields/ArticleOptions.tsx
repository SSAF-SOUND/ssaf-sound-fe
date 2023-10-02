import type { ArticleFormValues } from '~/components/Forms/ArticleForm/utils';
import type { ArticleImage } from '~/services/article';

import { css } from '@emotion/react';
import { isBoolean } from 'is-what';
import { useEffect } from 'react';

import { Checkbox } from '~/components/Common/Checkbox';
import Editor from '~/components/Editor';
import { useArticleFormContext } from '~/components/Forms/ArticleForm/utils';
import { useModal } from '~/components/GlobalModal';
import ThumbnailBar from '~/components/ThumbnailBar';
import { useImageUpload } from '~/services/s3/hooks';
import { flex, palettes } from '~/styles/utils';

const imageFieldName = 'images';
const maxImageCount = 3;
const validateImages = (value: ArticleImage[]) => {
  if (value.length > maxImageCount)
    return `한 번에 업로드할 수 있는 최대 이미지의 개수는 ${maxImageCount}개 입니다.`;
};

const anonymousFieldName = 'anonymous';

export const ArticleOptions = () => {
  const {
    register,
    setValue,
    formState: {
      defaultValues: {
        images: defaultImages = [],
        anonymous: defaultAnonymous = false,
      } = {},
    },
  } = useArticleFormContext();

  const handleAnonymousChange = (value: boolean) => {
    setValue(anonymousFieldName, value, { shouldDirty: true });
  };

  const createInitialImages = () =>
    (defaultImages.filter(Boolean) as ArticleFormValues['images']).map(
      ({ imageUrl, imagePath }) => ({
        imageUrl,
        imagePath,
        thumbnailUrl: imageUrl,
      })
    );

  const { images, setImages, handleOpenImageUploader, isUploading } =
    useImageUpload({
      initialImages: createInitialImages,
      maxImageCount,
    });

  const { openRemoveThumbnailReconfirmModal } =
    useRemoveThumbnailReconfirmModal();

  const removeImageByIndex = (index: number) =>
    setImages((p) => p.filter((_, i) => i !== index));

  const hasImages = images.length > 0;

  const thumbnails = images.map(({ thumbnailUrl, imageUrl }) => {
    return {
      loading: !imageUrl,
      thumbnailUrl,
    };
  });

  register(imageFieldName, {
    validate: validateImages,
  });

  register(anonymousFieldName, {
    validate: (value) => isBoolean(value),
  });

  useEffect(() => {
    // sync image load and form image values
    const imageFieldValues = images.map(({ imageUrl, imagePath }) => ({
      imageUrl: imageUrl || '',
      imagePath: imagePath || '',
    }));
    setValue(imageFieldName, imageFieldValues, {
      shouldDirty: true,
    });
  }, [images, setValue]);

  return (
    <div>
      {hasImages && (
        <ThumbnailBar
          css={thumbnailBarCss}
          thumbnails={thumbnails}
          onClickRemoveThumbnail={(index) =>
            openRemoveThumbnailReconfirmModal(() => removeImageByIndex(index))
          }
          disableRemove={isUploading}
        />
      )}

      <Editor.ToolBar css={optionsBarCss}>
        <Editor.ToolBarItem name="image" onClick={handleOpenImageUploader} />

        <label css={anonymousLayerCss}>
          <Checkbox
            defaultChecked={defaultAnonymous}
            onCheckedChange={handleAnonymousChange}
          />
          <span>익명</span>
        </label>
      </Editor.ToolBar>
    </div>
  );
};

const useRemoveThumbnailReconfirmModal = () => {
  const { openModal, closeModal } = useModal();

  const openRemoveThumbnailReconfirmModal = (onClickAction: () => void) => {
    const handleClickAction = () => {
      onClickAction();
      closeModal();
    };
    openModal('alert', {
      title: '알림',
      description: '이미지를 삭제합니다.',
      actionText: '삭제',
      cancelText: '취소',
      onClickCancel: closeModal,
      onClickAction: handleClickAction,
    });
  };

  return { openRemoveThumbnailReconfirmModal };
};

const optionsBarCss = css({
  justifyContent: 'space-between',
});

const anonymousLayerCss = css(
  { cursor: 'pointer' },
  flex('center', '', 'row', 4)
);

const thumbnailBarCss = css({
  border: `1px solid ${palettes.grey3}`,
  borderTop: 0,
  borderBottom: 0,
});
