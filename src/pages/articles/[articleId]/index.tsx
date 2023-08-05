import Link from 'next/link';

import { Button } from '~/components/Common';
import { fontCss } from '~/styles/utils';
import { routes } from '~/utils';

interface ArticleDetailPageProps {}

const ArticleDetailPage = (props: ArticleDetailPageProps) => {
  return (
    <div>
      <h2 css={fontCss.style.B28}>ArticleDetail</h2>
      <Button asChild css={{ width: 100 }}>
        <Link href={routes.articles.create(1)}>글 작성</Link>
      </Button>
    </div>
  );
};

export default ArticleDetailPage;

// SSR
