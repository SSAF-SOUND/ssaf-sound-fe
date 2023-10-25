import type { CustomNextPage } from 'next/types';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { useState } from 'react';

import { FullPageLoader, loaderText } from '~/components/Common/FullPageLoader';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import NameCard from '~/components/NameCard';
import NavigationGroup from '~/components/NavigationGroup';
import {
  getSafeProfileTabValue,
  Profile,
  ProfileTabs,
} from '~/components/Profile';
import { toSafePageValue } from '~/services/common/utils/pagination';
import { useMyInfo } from '~/services/member';
import {
  defaultRecruitsFirstPage,
  defaultRecruitsPageKey,
  RecruitCategoryName,
} from '~/services/recruit';
import {
  expandCss,
  flex,
  globalVars,
  gnbHeight,
  titleBarHeight,
} from '~/styles/utils';
import { createAuthGuard, createNoIndexPageMetaData, routes } from '~/utils';

export const enum ParamsKey {
  TAB = 'tab',
  PAGE = defaultRecruitsPageKey,
}

export type Params = {
  [ParamsKey.TAB]?: ProfileTabs;
  [ParamsKey.PAGE]?: string;
};

const metaTitle = '내 프로필';

const MyProfilePage: CustomNextPage = () => {
  const router = useRouter();
  const query = router.query as Params;
  const { page, tab } = query;
  const { data: myInfo } = useMyInfo();
  const [latestPages, setLatestPages] = useState({
    [ProfileTabs.PROJECT]: defaultRecruitsFirstPage,
    [ProfileTabs.STUDY]: defaultRecruitsFirstPage,
    [ProfileTabs.PORTFOLIO]: undefined,
  });

  if (!myInfo) {
    router.replace(routes.auth.signIn());
    return <FullPageLoader text={loaderText.checkUser} />;
  }

  const safePage = toSafePageValue(page);
  const safeTabValue = getSafeProfileTabValue(tab);

  const onTabValueChange = async (value: string) => {
    const nextTabValue = value as ProfileTabs;
    const latestPageOfNextTabValue = latestPages[nextTabValue];
    const previousTabValue = safeTabValue;

    // 다음 탭이 "포트폴리오"라면 page값을 지움.
    await router.push({
      query: {
        ...router.query,
        [ParamsKey.TAB]: nextTabValue,
        [ParamsKey.PAGE]: latestPageOfNextTabValue ?? [],
      },
    });

    if (
      previousTabValue === ProfileTabs.PROJECT ||
      previousTabValue === ProfileTabs.STUDY
    ) {
      setLatestPages((p) => ({
        ...p,
        [previousTabValue]: safePage,
      }));
      return;
    }
  };
  const { memberId: myId } = myInfo;

  return (
    <>
      <PageHeadingText text={metaTitle} />
      <div css={selfCss}>
        <NavigationGroup />

        <div css={[userInfoLayerCss, { marginBottom: 44 }]}>
          <NameCard userInfo={myInfo} css={{ padding: 0 }} />
          <Profile.MyInfoSettingsLink />
        </div>

        <div css={[myArticlesLayerCss, pageExpandCss, { marginBottom: 50 }]}>
          <Profile.NavItem
            iconName="bookmark.outline"
            href={routes.profile.myScraps()}
            text="나의 스크랩"
          />
          <Profile.NavItem
            iconName="document"
            href={routes.profile.myArticles()}
            text="내가 작성한 게시글"
          />
        </div>

        <Profile.Tabs.Root
          value={safeTabValue}
          onValueChange={onTabValueChange}
        >
          <Profile.Tabs.Triggers css={pageExpandCss} />

          <Profile.Tabs.PortfolioTabContent
            mine={true}
            userId={myInfo.memberId}
            marginForExpand={globalVars.mainLayoutPaddingX.var}
          />

          <Profile.Tabs.JoinedRecruitsTabContent
            category={RecruitCategoryName.PROJECT}
            userId={myId}
            mine={true}
            page={safePage}
          />

          <Profile.Tabs.JoinedRecruitsTabContent
            category={RecruitCategoryName.STUDY}
            userId={myId}
            mine={true}
            page={safePage}
          />
        </Profile.Tabs.Root>
      </div>
    </>
  );
};

const selfPaddingTop = titleBarHeight + 30;
const selfPaddingBottom = gnbHeight + 30;
const selfCss = css({
  padding: `${selfPaddingTop}px 0 ${selfPaddingBottom}px`,
});
const userInfoLayerCss = css(flex('center', 'space-between', 'row', 12));
const pageExpandCss = expandCss();
const myArticlesLayerCss = css(flex('', 'center', 'column', 8));

export default MyProfilePage;
MyProfilePage.auth = createAuthGuard();
MyProfilePage.meta = createNoIndexPageMetaData(metaTitle);
MyProfilePage.mainLayoutStyle = { overflow: 'unset' };
