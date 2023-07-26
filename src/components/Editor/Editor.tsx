import type { ReactQuillProps } from 'react-quill';

import dynamic from 'next/dynamic';

import { css } from '@emotion/react';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

import { Icon, IconButton } from '~/components/Common';
import { classnames as cn } from '~/components/Editor/classnames';
import ThumbnailBar from '~/components/Editor/ThumbnailBar';
import { useImageUpload } from '~/services/s3/hooks';
import { fontCss, palettes } from '~/styles/utils';

const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>로딩중</p>,
});

export interface EditorProps
  extends Pick<
    ReactQuillProps,
    'value' | 'onChange' | 'defaultValue' | 'placeholder'
  > {
  withCustomToolbar?: boolean;
}

const Editor = (props: EditorProps) => {
  const { withCustomToolbar = true, ...restProps } = props;
  const { images, handleOpenImageUploader, isUploading } = useImageUpload();

  return (
    <ReactQuill
      css={selfCss}
      {...restProps}
      modules={modules}
      formats={formats}
    />
  );
};

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'underline'],
      ['code', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ],
  },
};

const formats = [
  'header',
  'bold',
  'underline',
  'list',
  'bullet',
  'link',
  'code',
  'code-block',
];

export default Editor;

const editorBorder = `1px ${palettes.grey3} solid`;

const selfCss = css({
  backgroundColor: palettes.white,
  color: 'black',
  [`& .${cn.toolbar}`]: {
    border: editorBorder,
  },
  [`& .${cn.editorContainer}`]: {
    border: editorBorder,
    borderBottom: 0,
  },
  [`& .${cn.editor}`]: {
    fontFamily: fontCss.family.auto.fontFamily,
    height: 300,
    '::before': {
      // placeholder 스타일
      fontStyle: 'normal',
    },
  },
  '& strong': {
    fontWeight: 700,
  },
});

const thumbnailBarCss = css({});

const bottomToolbarCss = css({
  padding: 8,
  border: editorBorder,
});
