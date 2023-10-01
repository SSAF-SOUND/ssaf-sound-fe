import { css } from '@emotion/react';
import { memo } from 'react';

import { fontCss, palettes } from '~/styles/utils';

interface CommentContentProps {
  content: string;
  modified: boolean;
  className?: string;
}

const CommentContent = memo((props: CommentContentProps) => {
  const { content, modified, className } = props;

  return (
    <div css={selfCss} className={className}>
      <p>
        <span css={contentCss}>{content}</span>{' '}
        {modified && <span css={modifiedCss}>(수정됨)</span>}
      </p>
    </div>
  );
});
CommentContent.displayName = 'CommentContent';
export default CommentContent;

const selfCss = css(fontCss.style.R14);
const modifiedCss = css({ color: palettes.primary.default }, fontCss.style.R14);
const contentCss = css({ whiteSpace: 'pre-wrap' }, fontCss.style.R14);
