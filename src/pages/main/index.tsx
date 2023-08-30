import { css } from '@emotion/react';

import { PageHead, PageHeadingText } from '~/components/Common';
import { HotArticlesPreview } from '~/components/HotArticlesPreview';
import { LunchMenusPreview } from '~/components/Lunch';
import NavigationGroup from '~/components/NavigationGroup';
import RecruitsPreview from '~/components/RecruitsPreview';
import { globalVars, topBarHeight } from '~/styles/utils';
import { routes } from '~/utils';
import { globalMetaData } from '~/utils/metadata';

const metaTitle = '홈';
const metaDescription = `${globalMetaData.description} 점심 메뉴, 리쿠르팅, 핫 게시글 등 다양한 SSAF SOUND의 기능을 활용해보세요.`;

const MainPage = () => {
  return (
    <>
      <PageHead
        title={metaTitle}
        description={metaDescription}
        openGraph={{
          title: metaTitle,
          description: metaDescription,
          url: routes.main(),
        }}
      />

      <PageHeadingText text={metaTitle} />

      <div css={selfCss}>
        <NavigationGroup />
        <LunchMenusPreview css={{ marginBottom: 80 }} />
        <HotArticlesPreview css={{ marginBottom: 50 }} />
        <RecruitsPreview
          css={{ marginBottom: 50 }}
          marginForExpand={marginForExpand}
        />
      </div>
    </>
  );
};

export default MainPage;

const selfPaddingY = topBarHeight + 30;
const selfPaddingX = 15;
const marginForExpand = `calc(${selfPaddingX}px + ${globalVars.mainLayoutPaddingX.var})`;

const selfCss = css({
  padding: `${selfPaddingY}px ${selfPaddingX}px`,
});
