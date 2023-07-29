import type { ArticleDetail } from '~/services/article';

import ArticleHeader from './ArticleHeader';
import ArticleMain from './ArticleMain';
import ArticleStats from './ArticleStats';

interface ArticleProps {
  articleDetail: ArticleDetail;
  className?: string;
}

export const Article = (props: ArticleProps) => {
  const { articleDetail, className } = props;

  return (
    <article className={className}>
      <ArticleHeader css={{ marginBottom: 10 }} articleDetail={articleDetail} />
      <ArticleMain css={{ marginBottom: 30 }} articleDetail={articleDetail} />
      <ArticleStats articleDetail={articleDetail} />
    </article>
  );
};
