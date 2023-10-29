import type { DeltaStatic } from 'quill';
import type { ReactQuillProps } from 'react-quill';

import dynamic from 'next/dynamic';

import { css } from '@emotion/react';
import 'react-quill/dist/quill.snow.css';

import { editorClassnames as cn } from '~/components/Editor/editorClassnames';
import EditorSkeleton from '~/components/Editor/EditorSkeleton';
import { articleCss } from '~/services/article';
import { fontCss, palettes } from '~/styles/utils';
import { regex } from '~/utils';

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

// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node.text_node
const TEXT_NODE = 3;

// https://github.com/quilljs/quill/issues/109#issuecomment-278181150
const convertUrlTextToLink = (node: Text, delta: DeltaStatic) => {
  if (typeof node.data !== 'string') return;
  const matches = node.data.match(regex.looseUrl);

  if (matches && matches.length > 0) {
    const ops = [];
    let str = node.data;
    matches.forEach((match) => {
      const split = str.split(match);
      const beforeLink = split.shift();
      ops.push({ insert: beforeLink });
      ops.push({ insert: match, attributes: { link: match } });
      str = split.join(match);
    });
    ops.push({ insert: str });
    delta.ops = ops;
  }

  return delta;
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
  clipboard: {
    matchers: [[TEXT_NODE, convertUrlTextToLink]],
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
    fontFamily: fontCss.family.pretendard.fontFamily,
    height: 450,
    '::before': {
      // placeholder 스타일
      fontStyle: 'normal',
    },
  },
});
