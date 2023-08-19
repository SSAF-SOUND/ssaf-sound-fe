import type { ReactQuillProps } from 'react-quill';

import dynamic from 'next/dynamic';

import { css } from '@emotion/react';
import 'react-quill/dist/quill.snow.css';

import { classnames as cn } from '~/components/Editor/classnames';
import EditorSkeleton from '~/components/Editor/EditorSkeleton';
import { articleCss } from '~/services/article';
import { flex, fontCss, palettes } from '~/styles/utils';

const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <EditorSkeleton />,
});

export interface EditorProps
  extends Pick<
    ReactQuillProps,
    'value' | 'onChange' | 'defaultValue' | 'placeholder'
  > {}

const Editor = (props: EditorProps) => {
  return (
    <ReactQuill
      css={[selfCss, articleCss]}
      {...props}
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
    height: 450,
    '::before': {
      // placeholder 스타일
      fontStyle: 'normal',
    },
  },
});
