import type { Meta, StoryObj } from '@storybook/react';

import { css } from '@emotion/react';
import { useState } from 'react';

import { AlertText } from '~/components/Common/AlertText';
import { useModal } from '~/components/GlobalModal';
import ThumbnailBar from '~/components/ThumbnailBar';
import { useImageUpload } from '~/services/s3/hooks';
import { PageLayout } from '~/stories/Layout';
import { flex, fontCss, palettes } from '~/styles/utils';

import Editor from './index';

const meta: Meta<typeof Editor> = {
  title: 'Input/Editor',
  component: Editor,
  decorators: [
    (Story) => {
      return (
        <PageLayout>
          <Story />
        </PageLayout>
      );
    },
  ],
};

export default meta;

type EditorStory = StoryObj<typeof Editor>;
export const Default: EditorStory = {};

export const LengthTest = () => {
  const [textLength, setTextLength] = useState(0);
  const [htmlLength, setHtmlLength] = useState(0);

  const lengthStyle = (length: number) => {
    if (length < 500) return { color: 'inherit' };
    if (length < 1000) return { color: palettes.success.light };
    if (length < 2000) return { color: palettes.warning.light };
    if (length < 3000) return { color: palettes.warning.default };
    if (length < 4000) return { color: palettes.warning.dark };
    if (length < 5000) return { color: palettes.error.default };
    return { color: palettes.error.dark };
  };

  return (
    <div>
      <div css={lengthCss}>
        <p style={lengthStyle(textLength)}>Text Length: {textLength}</p>
        <p style={lengthStyle(htmlLength)}>Html Length: {htmlLength}</p>
      </div>
      <div>
        <Editor
          onChange={(value, _, __, editor) => {
            setTextLength(editor.getLength() - 1);
            setHtmlLength(editor.getHTML().length);
          }}
        />
      </div>
    </div>
  );
};

const lengthCss = css(
  {
    width: '100%',
    padding: '10px 0',
    '& > *': {
      transition: 'color 300ms',
    },
  },
  flex('center', '', 'column', 10),
  fontCss.style.B16
);

export const OtherOptions = () => {
  const { images, handleOpenImageUploader, setImages } = useImageUpload({
    initialImages: [],
    maxImageCount: 5,
  });

  const hasImages = Boolean(images.length);
  const { openModal, closeModal } = useModal();
  const openRemoveThumbnailReconfirmModal = (index: number) => {
    openModal('alert', {
      title: '알림',
      actionText: '삭제',
      description: '썸네일을 삭제합니다.',
      cancelText: '취소',
      onClickAction: () => {
        setImages((p) => p.filter((_, i) => i !== index));
        closeModal();
      },
      onClickCancel: closeModal,
    });
  };

  return (
    <div>
      <Editor.TitleInput placeholder="Title" />
      <Editor placeholder="Content" />

      <Editor.MessageBox css={messageBoxCss}>
        <AlertText>경고 메세지</AlertText>
      </Editor.MessageBox>

      {hasImages && (
        <ThumbnailBar
          css={thumbnailBarCss}
          thumbnails={images.map(({ imageUrl, thumbnailUrl }) => ({
            thumbnailUrl,
            loading: !imageUrl,
          }))}
          onClickRemoveThumbnail={openRemoveThumbnailReconfirmModal}
        />
      )}
      <Editor.ToolBar css={{ borderTop: 0 }}>
        <Editor.ToolBarItem name="image" onClick={handleOpenImageUploader} />
      </Editor.ToolBar>
    </div>
  );
};

const thumbnailBarCss = css({
  border: `1px solid ${palettes.grey3}`,
  borderTop: 0,
  borderBottom: 0,
});

const messageBoxCss = css({
  padding: '0 15px',
  borderTop: 0,
});
