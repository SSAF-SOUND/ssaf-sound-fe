import type { ArticleCommentFormProps } from '~/components/Forms/ArticleCommentForm';

import { css } from '@emotion/react';

import { Modal, VisuallyHidden } from '~/components/Common';
import ArticleCommentForm from '~/components/Forms/ArticleCommentForm';
import { fontCss, pageMaxWidth, palettes } from '~/styles/utils';
import { position } from '~/styles/utils/position';

export interface ArticleCommentModalFormProps {
  defaultValues?: ArticleCommentFormProps['defaultValues'];
  onValidSubmit: ArticleCommentFormProps['onValidSubmit'];
}

export const ArticleCommentModalForm = (
  props: ArticleCommentModalFormProps
) => {
  const { onValidSubmit, defaultValues } = props;

  return (
    <div css={selfCss}>
      <VisuallyHidden>
        <Modal.Title>게시글 댓글 작성</Modal.Title>
      </VisuallyHidden>

      <ArticleCommentForm
        onValidSubmit={onValidSubmit}
        defaultValues={defaultValues}
      />
    </div>
  );
};

const selfCss = css(
  {
    backgroundColor: palettes.background.default,
    minWidth: 280,
    width: '90%',
    maxWidth: pageMaxWidth - 30,
    borderRadius: 16,
    bottom: 30,
  },
  position.x('center', 'fixed'),
  fontCss.family.auto
);
