import type { CustomNextPage } from 'next/types';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { useState } from 'react';

import { BreadCrumbs, breadcrumbsHeight } from '~/components/BreadCrumbs';
import { FullPageLoader, loaderText } from '~/components/Common/FullPageLoader';
import { PageHead } from '~/components/Common/PageHead';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import NameCard from '~/components/NameCard';
import {
  getSafeProfileTabValue,
  Profile,
  ProfileTabs,
} from '~/components/Profile';
import TitleBar from '~/components/TitleBar';
import { toSafePageValue } from '~/services/common/utils/pagination';
import {
  useMyInfo,
  useUserInfo,
  useUserProfileVisibility,
} from '~/services/member';
import {
  deletedUserDisplayNickname,
  isDeletedUser,
} from '~/services/member/utils/isDeletedUser';
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
  pageCss,
  titleBarHeight,
  topBarHeight,
} from '~/styles/utils';
import { createNoIndexPageMetaData, routes } from '~/utils';

const createMetaTitle = (username: string) => {
  return `${username} - 프로필`;
};

export const enum ParamsKey {
  USER_ID = 'userId',
  TAB = 'tab',
  PAGE = defaultRecruitsPageKey,
}
export type Params = {
  [ParamsKey.USER_ID]?: string;
  [ParamsKey.TAB]?: ProfileTabs;
  [ParamsKey.PAGE]?: string;
};

const UserProfilePage: CustomNextPage = () => {
  const router = useRouter();
  const query = router.query as Params;
  const userId = Number(query.userId);
  const { page, tab } = query;
  const [latestPages, setLatestPages] = useState({
    [ProfileTabs.PROJECT]: defaultRecruitsFirstPage,
    [ProfileTabs.STUDY]: defaultRecruitsFirstPage,
    [ProfileTabs.PORTFOLIO]: undefined,
  });

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
  const isDeletedUserInfo = isDeletedUser(userInfo);
  const metaTitle = createMetaTitle(
    isDeletedUserInfo ? deletedUserDisplayNickname : userInfo.nickname
  );
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

  const metaData = createNoIndexPageMetaData(metaTitle);

  return (
    <>
      <PageHead {...metaData} />

      <PageHeadingText text={metaTitle} />

      <div css={selfCss}>
        <TitleBar.Default
          title="프로필"
          withoutClose
          footer={
            <BreadCrumbs
              entries={[
                { name: '홈', link: routes.main() },
                {
                  name: '다른 사람의 프로필',
                  link: routes.profile.detail(userId),
                  active: true,
                },
              ]}
            />
          }
        />

        <div css={userInfoLayerCss}>
          <NameCard userInfo={userInfo} css={nameCardCss} />
        </div>

        {!isDeletedUserInfo &&
          (isProfilePublic ? (
            <Profile.Tabs.Root
              value={safeTabValue}
              onValueChange={onTabValueChange}
            >
              <Profile.Tabs.Triggers css={pageExpandCss} />

              <Profile.Tabs.PortfolioTabContent
                mine={false}
                userId={userId}
                marginForExpand={globalVars.mainLayoutPaddingX.var}
              />

              <Profile.Tabs.JoinedRecruitsTabContent
                category={RecruitCategoryName.PROJECT}
                userId={userId}
                mine={false}
                page={safePage}
                paginationContainerStyle={paginationOverrideStyle}
              />

              <Profile.Tabs.JoinedRecruitsTabContent
                category={RecruitCategoryName.STUDY}
                userId={userId}
                mine={false}
                page={safePage}
                paginationContainerStyle={paginationOverrideStyle}
              />
            </Profile.Tabs.Root>
          ) : (
            <Profile.PrivateIndicator css={privateProfileCss} />
          ))}
      </div>
    </>
  );
};

export default UserProfilePage;
UserProfilePage.mainLayoutStyle = { overflow: 'unset' };

const privateProfileCss = css({ flexGrow: 1 });

const selfCss = css(
  {
    padding: `${topBarHeight + breadcrumbsHeight + 30}px 0 ${gnbHeight + 30}px`,
  },
  pageCss.minHeight,
  flex('', '', 'column')
);
const paginationTop = titleBarHeight + breadcrumbsHeight;

const paginationOverrideStyle = {
  top: paginationTop,
};

const pageExpandCss = expandCss(globalVars.mainLayoutPaddingX.var);

const userInfoLayerCss = css(
  { marginBottom: 44 },
  flex('center', 'space-between', 'row', 10)
);

const nameCardCss = css({ padding: 0 });
