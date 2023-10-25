import { css } from '@emotion/react';
import { memo, useMemo } from 'react';

import { fontCss } from '~/styles/utils';
import { regex, sanitizeHtml } from '~/utils';
import { escapeHtmlString } from '~/utils/escapeHtmlString';

interface CommentContentProps {
  content: string;
  modified: boolean;
  className?: string;
}

const CommentContent = memo((props: CommentContentProps) => {
  const { content, className } = props;
  const htmlString = useMemo(
    () =>
      sanitizeHtml(
        escapeHtmlString(content).replace(
          regex.looseUrl,
          (url) => `<a href="${url}">${url}</a>`
        ),
        ['a']
      ),
    [content]
  );

  return (
    <div css={selfCss} className={className}>
      <p>
        <span
          css={contentCss}
          dangerouslySetInnerHTML={{ __html: htmlString }}
        />
      </p>
    </div>
  );
});
CommentContent.displayName = 'CommentContent';
export default CommentContent;

const selfCss = css(fontCss.style.R14);
const contentCss = css(
  { whiteSpace: 'pre-wrap', a: { textDecoration: 'underline' } },
  fontCss.style.R14
);
