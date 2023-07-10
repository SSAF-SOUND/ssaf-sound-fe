import type { Meta, StoryObj } from '@storybook/react';

import { css } from '@emotion/react';
import { useCallback, useState } from 'react';

import { PageLayout } from '~/stories/Layout';
import { flex, fontCss, palettes } from '~/styles/utils';

import Editor from './index';

const meta: Meta<typeof Editor> = {
  title: 'Editor',
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
export const Default: EditorStory = {
  args: {
    withCustomToolbar: true,
  },
};

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
    <>
      <div>
        <Editor
          onChange={(value, _, __, editor) => {
            setTextLength(editor.getLength() - 1);
            setHtmlLength(editor.getHTML().length);
          }}
        />
      </div>

      <div css={lengthCss}>
        <p style={lengthStyle(textLength)}>Text Length: {textLength}</p>
        <p style={lengthStyle(htmlLength)}>Html Length: {htmlLength}</p>
      </div>
    </>
  );
};

const lengthCss = css(
  {
    width: '100%',
    marginTop: 20,
    '& > *': {
      transition: 'color 300ms',
    },
  },
  flex('', 'center', 'column', 20),
  fontCss.style.B18
);
