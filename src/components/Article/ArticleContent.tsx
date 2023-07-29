import { css } from '@emotion/react';

import { sanitizeHtml } from '~/utils';

interface ArticleContentProps {
  html: string;
}

const ArticleContent = (props: ArticleContentProps) => {
  const { html } = props;
  const sanitized = sanitizeHtml(html);

  return (
    <div css={selfCss} dangerouslySetInnerHTML={{ __html: sanitized }} />
  );
};

export default ArticleContent;

// TODO: Content Style
const selfCss = css({});
