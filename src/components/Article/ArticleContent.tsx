import { css } from '@emotion/react';

import { sanitizeHtml } from '~/utils';

interface ArticleContentProps {
  html: string;
  className?: string;
}

const ArticleContent = (props: ArticleContentProps) => {
  const { html, className } = props;
  const sanitized = sanitizeHtml(html);

  return (
    <div
      css={selfCss}
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
};

export default ArticleContent;

// TODO: Content Style
const selfCss = css({});
