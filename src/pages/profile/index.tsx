import type { CustomNextPage } from 'next/types';
import type { ProfileTabs } from '~/components/Profile';


import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import {
  FullPageLoader,
  loaderText,
  PageHeadingText,
} from '~/components/Common';
import NameCard from '~/components/NameCard';
import NavigationGroup from '~/components/NavigationGroup';
import { getSafeProfileTabValue, Profile } from '~/components/Profile';
import { useMyInfo } from '~/services/member';
import { RecruitCategoryName } from '~/services/recruit';
import {
  expandCss,
  flex,
  globalVars,
  gnbHeight,
  titleBarHeight,
} from '~/styles/utils';
import {
  createAuthGuard,
  createNoIndexPageMetaData,
  customToast,
  routes,
} from '~/utils';

const enum ParamsKey {
  TAB = 'tab',
}
type Params = {
  [ParamsKey.TAB]: ProfileTabs;
};

const metaTitle = '내 프로필';

const MyProfilePage: CustomNextPage = () => {
  const router = useRouter();
  const query = router.query as Partial<Params>;
  const { data: myInfo } = useMyInfo();

  if (!myInfo) {
    customToast.clientError('로그인이 필요합니다.');
    router.replace(routes.signIn());
    return <FullPageLoader text={loaderText.checkUser} />;
  }

  const tabValue = getSafeProfileTabValue(query.tab);
  const onTabValueChange = (value: string) => {
    router.push({
      query: { ...router.query, [ParamsKey.TAB]: value },
    });
  };
  const { memberId } = myInfo;

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
            href={routes.profile.myScraps()}
            text="내가 작성한 게시글"
          />
        </div>

        <Profile.Tabs.Root value={tabValue} onValueChange={onTabValueChange}>
          <Profile.Tabs.Triggers css={pageExpandCss} />

          <Profile.Tabs.PortfolioTabContent
            mine={true}
            userId={myInfo.memberId}
            marginForExpand={globalVars.mainLayoutPaddingX.var}
          />

          <Profile.Tabs.JoinedRecruitsTabContent
            category={RecruitCategoryName.PROJECT}
            userId={memberId}
            mine={true}
          />

          <Profile.Tabs.JoinedRecruitsTabContent
            category={RecruitCategoryName.STUDY}
            userId={memberId}
            mine={true}
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
