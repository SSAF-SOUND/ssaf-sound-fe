import type { CustomNextPage } from 'next/types';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import {
  FullPageLoader,
  loaderText,
  PageHead,
  PageHeadingText,
  Tabs,
} from '~/components/Common';
import NameCard from '~/components/NameCard';
import { getSafeProfileTabValue, Profile } from '~/components/Profile';
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
  pageCss,
  topBarHeight,
} from '~/styles/utils';
import { isStorybookMode, routes } from '~/utils';

const createMetaTitle = (username: string) => {
  return `${username} - 프로필`;
};

const isIdNaN = (id: number) => {
  if (isStorybookMode()) return false;

  return Number.isNaN(id);
};

const enum ParamsKey {
  USER_ID = 'userId',
  TAB = 'tab',
}
type Params = Record<ParamsKey, string>;

const UserProfilePage: CustomNextPage = () => {
  const router = useRouter();
  const query = router.query as Params;
  const userId = Number(query.userId);

  const { data: myInfo, isLoading: isMyInfoLoading } = useMyInfo();
  const {
    data: userInfo,
    error: userInfoError,
    isLoading: isUserInfoLoading,
    isError: isUserInfoError,
  } = useUserInfo(userId);

  const {
    data: userProfileVisibility,
    isLoading: isUserProfileVisibilityLoading,
    isError: isUserProfileVisibilityError,
    error: userProfileVisibilityError,
  } = useUserProfileVisibility(userId);

  const mine = userInfo && myInfo && userInfo.memberId === myInfo.memberId;

  if (isIdNaN(userId)) {
    return <NotFoundPage />;
  }

  if (mine) {
    router.replace(routes.profile.self());
    return <FullPageLoader />;
  }

  if (isUserInfoError || isUserProfileVisibilityError) {
    const error = userInfoError || userProfileVisibilityError;
    return <Profile.UserError error={error} />;
  }

  if (isUserInfoLoading || isUserProfileVisibilityLoading || isMyInfoLoading) {
    return <FullPageLoader text={loaderText.checkUser} />;
  }

  const isProfilePublic = userProfileVisibility.isPublic;
  const metaTitle = createMetaTitle(userInfo.nickname);
  const tabValue = getSafeProfileTabValue(query.tab);
  const onTabValueChange = (value: string) => {
    router.push({
      query: { ...router.query, [ParamsKey.TAB]: value },
    });
  };

  return (
    <>
      <PageHead title={metaTitle} robots={{ follow: false, index: false }} />

      <PageHeadingText text={metaTitle} />

      <div css={selfCss}>
        <TitleBar.Default
          title="프로필"
          withoutClose
          // TODO: Return Page
          onClickBackward={routes.main()}
        />

        <div css={userInfoLayerCss}>
          <NameCard userInfo={userInfo} css={nameCardCss} />
        </div>

        {isProfilePublic ? (
          <Profile.Tabs.Root value={tabValue} onValueChange={onTabValueChange}>
            <Profile.Tabs.Triggers css={pageExpandCss} />

            <Profile.Tabs.PortfolioTabContent
              mine={mine}
              userId={userId}
              marginForExpand={globalVars.mainLayoutPaddingX.var}
            />

            <Tabs.Content value="2">
              <div>2</div>
            </Tabs.Content>

            <Tabs.Content value="3">
              <div>3</div>
            </Tabs.Content>
          </Profile.Tabs.Root>
        ) : (
          <Profile.PrivateIndicator css={privateProfileCss} />
        )}
      </div>
    </>
  );
};

export default UserProfilePage;

const privateProfileCss = css({ flexGrow: 1 });

const selfCss = css(
  {
    padding: `${topBarHeight + 30}px 0 ${gnbHeight + 30}px`,
  },
  pageCss.minHeight,
  flex('', '', 'column')
);

const pageExpandCss = expandCss(globalVars.mainLayoutPaddingX.var);

const userInfoLayerCss = css(
  { marginBottom: 44 },
  flex('center', 'space-between', 'row', 10)
);

const nameCardCss = css({ padding: 0 });
