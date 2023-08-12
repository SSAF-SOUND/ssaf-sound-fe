import type { CustomNextPage } from 'next/types';

import { css } from '@emotion/react';

import ArticleCardList from '~/components/ArticleCardList';
import {
  DefaultFullPageLoader,
  loaderText,
  PageHead,
  PageHeadingText,
} from '~/components/Common';
import TitleBar from '~/components/TitleBar';
import { useMyArticles } from '~/services/article';
import { useMyInfo } from '~/services/member';
import { titleBarHeight } from '~/styles/utils';
import { routes } from '~/utils';

const titleBarTitle = '내가 작성한 게시글';
const metaTitle = titleBarTitle;

const MyArticlesPage: CustomNextPage = () => {
  const { data: myInfo } = useMyInfo();

  if (!myInfo) {
    return <DefaultFullPageLoader text={loaderText.checkUser} />;
  }

  return (
    <>
      <PageHead title={metaTitle} robots={{ index: false, follow: false }} />

      <PageHeadingText text={titleBarTitle} />

      <div css={selfCss}>
        <TitleBar.Default
          withoutClose
          title={titleBarTitle}
          onClickBackward={routes.profile.detail(myInfo.memberId)}
        />

        <ArticleLayer />
      </div>
    </>
  );
};

const ArticleLayer = () => {
  const myArticlesInfiniteQuery = useMyArticles();

  return (
    <ArticleCardList
      hot
      infiniteQuery={myArticlesInfiniteQuery}
      skeletonCount={5}
    />
  );
};

export default MyArticlesPage;
MyArticlesPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader text={loaderText.checkUser} />,
  unauthorized: routes.unauthorized(),
};

const selfPaddingTop = titleBarHeight + 24;
const selfCss = css({
  padding: `${selfPaddingTop}px 15px 0`,
});
