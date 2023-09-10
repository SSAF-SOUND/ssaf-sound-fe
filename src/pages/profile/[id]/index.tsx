import type { CustomNextPage } from 'next/types';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import {
  DefaultFullPageLoader,
  loaderText,
  PageHead,
  PageHeadingText,
  Tabs,
} from '~/components/Common';
import NameCard from '~/components/NameCard';
import NavigationGroup from '~/components/NavigationGroup';
import { Profile, ProfileTabs } from '~/components/Profile';
import TitleBar from '~/components/TitleBar';
import NotFoundPage from '~/pages/404';
import {
  useMyInfo,
  useUserInfo,
  useUserProfileVisibility,
} from '~/services/member';
import {
  expandCss,
  flex,
  globalVars,
  gnbHeight,
  pageMinHeight,
  topBarHeight,
} from '~/styles/utils';
import { isStorybookMode, routes } from '~/utils';

const metaTitle = '프로필';

const isIdNaN = (id: number) => {
  if (isStorybookMode()) return false;

  return Number.isNaN(id);
};

type QueryString = {
  id: string;
};

const ProfilePage: CustomNextPage = () => {
  const router = useRouter();
  const query = router.query as QueryString;
  const id = Number(query.id);

  const { data: myInfo, isLoading: isMyInfoLoading } = useMyInfo();
  const {
    data: userInfo,
    error: userInfoError,
    isLoading: isUserInfoLoading,
    isError: isUserInfoError,
  } = useUserInfo(id);

  const {
    data: userProfileVisibility,
    isLoading: isUserProfileVisibilityLoading,
    isError: isUserProfileVisibilityError,
    error: userProfileVisibilityError,
  } = useUserProfileVisibility(id);

  const mine = userInfo && myInfo && userInfo.memberId === myInfo.memberId;

  if (isIdNaN(id)) {
    return <NotFoundPage />;
  }

  if (isUserInfoError || isUserProfileVisibilityError) {
    const error = userInfoError || userProfileVisibilityError;
    return <Profile.UserError error={error} />;
  }

  if (isUserInfoLoading || isUserProfileVisibilityLoading || isMyInfoLoading) {
    return <DefaultFullPageLoader text={loaderText.checkUser} />;
  }

  const isProfilePublic = userProfileVisibility.isPublic;

  return (
    <>
      <PageHead title={metaTitle} robots={{ follow: false, index: false }} />

      <PageHeadingText text={metaTitle} />

      <div css={selfCss}>
        {mine ? (
          <NavigationGroup />
        ) : (
          <TitleBar.Default
            title="프로필"
            withoutClose
            // TODO: Return Page
            onClickBackward={routes.main()}
          />
        )}

        <div css={userInfoLayerCss}>
          <NameCard userInfo={userInfo} css={nameCardCss} />
          {mine && <Profile.MyInfoSettingsLink />}
        </div>

        {mine && (
          <div css={navLayerCss}>
            <Profile.NavItem
              css={pageExpandCss}
              iconName="bookmark.outline"
              href={routes.profile.myScraps()}
              text="나의 스크랩"
            />

            <Profile.NavItem
              css={pageExpandCss}
              iconName="document"
              href={routes.profile.myArticles()}
              text="내가 작성한 게시글"
            />
          </div>
        )}

        {isProfilePublic ? (
          <Tabs.Root defaultValue={ProfileTabs.PORTFOLIO}>
            <Profile.TabsTriggers css={pageExpandCss} />

            <Profile.PortfolioTabContent
              mine={mine}
              userId={id}
              marginForExpand={globalVars.mainLayoutPaddingX.var}
            />

            <Tabs.Content value="2">
              <div>2</div>
            </Tabs.Content>

            <Tabs.Content value="3">
              <div>3</div>
            </Tabs.Content>
          </Tabs.Root>
        ) : (
          <Profile.PrivateIndicator css={privateProfileCss} />
        )}
      </div>
    </>
  );
};

export default ProfilePage;

const privateProfileCss = css({ flexGrow: 1 });

const selfCss = css(
  {
    padding: `${topBarHeight + 30}px 0 ${gnbHeight + 30}px`,
    minHeight: `max(${pageMinHeight}, 100vh)`,
  },
  flex('', '', 'column')
);

const pageExpandCss = expandCss(globalVars.mainLayoutPaddingX.var);

const userInfoLayerCss = css(
  { marginBottom: 44 },
  flex('center', 'space-between', 'row', 10)
);

const nameCardCss = css({ padding: 0 });

const navLayerCss = css({ marginBottom: 50 }, flex('', 'center', 'column', 8));
