import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '~/components/Common/Button';
import RedirectionGuide from '~/components/RedirectionGuide';
import { flex } from '~/styles/utils';
import { getErrorResponse, routes } from '~/utils';

interface ArticleErrorProps {
  error: unknown;
}

export const ArticleError = (props: ArticleErrorProps) => {
  const { error } = props;
  const router = useRouter();
  const errorResponse = getErrorResponse(error);
  const errorMessage =
    errorResponse?.message ?? '게시글을 불러오는 중 오류가 발생했습니다.';

  return (
    <RedirectionGuide
      title="Error"
      description={errorMessage}
      customLinkElements={
        <div css={flex('', '', 'column', 10)}>
          <Button size="lg" asChild>
            <Link href={routes.article.categories()}>
              게시판 모아보기 페이지로
            </Link>
          </Button>
          <Button
            variant="literal"
            size="lg"
            onClick={() => router.back()}
            style={{ textDecoration: 'underline', alignSelf: 'center' }}
          >
            뒤로 가기
          </Button>
        </div>
      }
    />
  );
};
