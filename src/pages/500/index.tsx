import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { Button } from '~/components/Common';
import RedirectionGuide from '~/components/RedirectionGuide';
import { flex } from '~/styles/utils';
import { routes } from '~/utils';

const ErrorPage = () => {
  return (
    <RedirectionGuide
      theme="primary"
      title="서버에서 오류가 발생했어요!"
      description={
        <>
          <p>서버에서 오류가 발생했습니다.</p>
          <p>잠시 후 다시 시도해주세요.</p>
        </>
      }
      customLinkElements={
        <div css={buttonsCss}>
          <Button asChild>
            <Link href={routes.main()}>메인 페이지로</Link>
          </Button>
          <Button
            css={buttonCss}
            variant="literal"
            onClick={() => window.location.reload()}
          >
            페이지 새로고침
          </Button>
        </div>
      }
    />
  );
};

export default ErrorPage;

const buttonsCss = css(flex('', '', 'column', 4));
const buttonCss = css({
  textDecoration: 'underline',
  margin: '0 auto',
});
