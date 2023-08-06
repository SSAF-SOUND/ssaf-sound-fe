import type { CustomNextPage } from 'next/types';

import { css } from '@emotion/react';

import ArticleCardList from '~/components/ArticleCardList';
import { DefaultFullPageLoader, loaderText } from '~/components/Common';
import TitleBar from '~/components/TitleBar';
import { useMyArticles } from '~/services/article';
import { useMyInfo } from '~/services/member';
import { titleBarHeight } from '~/styles/utils';
import { routes } from '~/utils';

const MyArticlesPage: CustomNextPage = () => {
  const { data: myInfo } = useMyInfo();

  if (!myInfo) {
    return <DefaultFullPageLoader text={loaderText.checkUser} />;
  }

  return (
    <div css={selfCss}>
      <TitleBar.Default
        withoutClose
        title="내가 작성한 게시글"
        onClickBackward={routes.profile.detail(myInfo.memberId)}
      />

      <ArticleLayer />
    </div>
  );
};

const ArticleLayer = () => {
  const myArticlesInfiniteQuery = useMyArticles();

  return (
    <ArticleCardList
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

const selfCss = css({
  paddingTop: titleBarHeight + 24,
});
