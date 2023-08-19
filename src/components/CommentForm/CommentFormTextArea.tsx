import type { Ref } from 'react';
import type { TextareaAutosizeProps } from 'react-textarea-autosize';

import { css } from '@emotion/react';
import { forwardRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { resetStyle } from '~/styles/utils';
import { useComposedRefs } from '~/hooks/useComposedRefs';

interface CommentFormTextAreaProps extends TextareaAutosizeProps {
  loading?: boolean;
}

export const CommentFormTextArea = forwardRef(
  (props: CommentFormTextAreaProps, ref: Ref<HTMLTextAreaElement>) => {
    const {
      name,
      defaultValue,
      loading,
      autoFocus = true,
      ...restProps
    } = props;

    const autoFocusRef = (node: HTMLTextAreaElement) => node && node.focus();
    return (
      <TextareaAutosize
        maxRows={3}
        maxLength={300}
        minRows={1}
        css={selfCss}
        name={name}
        defaultValue={defaultValue}
        disabled={loading}
        ref={useComposedRefs(ref, autoFocus ? autoFocusRef : undefined)}
        {...restProps}
      />
    );
  }
);

const selfCss = css(resetStyle.textArea(), {
  flex: '1',
});

CommentFormTextArea.displayName = 'CommentFormTextArea';
