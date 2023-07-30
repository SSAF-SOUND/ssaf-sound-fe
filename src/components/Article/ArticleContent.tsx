import { articleCss } from '~/services/article';
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
      css={articleCss}
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
};

export default ArticleContent;
