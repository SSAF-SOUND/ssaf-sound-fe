import type { CustomNextPage } from 'next/types';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import {
  Button,
  Icon,
  IconButton,
  SsafyIcon,
  Tabs,
  TrackSize,
} from '~/components/Common';
import NavigationGroup from '~/components/NavigationGroup';
import { Profile } from '~/components/Profile';
import { useMyInfo } from '~/services/member';
import {
  flex,
  fontCss,
  globalVars,
  gnbHeight,
  palettes,
  topBarHeight,
} from '~/styles/utils';
import { routes } from '~/utils';

const ProfilePage: CustomNextPage = () => {
  const router = useRouter();
  // eslint-disable-next-line
  const { id } = router.query as { id?: string };
  // eslint-disable-next-line
  const { data: myInfo } = useMyInfo();
  const hasPortfolio = true as boolean;
  const mine = true as boolean;

  // id로 프로필 조회
  // const { data: userInfo } = useUserInfo(id);
  // const mine = userInfo && myInfo && (userInfo.memberId === myInfo.memberId)

  return (
    <div css={selfCss}>
      <NavigationGroup />
      <div css={myInfoCss}>
        NameCard
        {/* <NameCard />  */}
        <IconButton asChild size={34}>
          <Link href={routes.profile.myInfoSettings()}>
            <Icon name="setting" size={28} />
          </Link>
        </IconButton>
      </div>

      {mine && (
        <div css={shortcutCss}>
          <Profile.NavItem
            css={expandCss}
            iconName="bookmark.outline"
            href={routes.profile.myScraps()}
            text="나의 스크랩"
          />

          <Profile.NavItem
            css={expandCss}
            iconName="document"
            href={routes.profile.myArticles()}
            text="내가 작성한 게시글"
          />
        </div>
      )}

      <Tabs.Root defaultValue="1">
        <Tabs.List css={expandCss}>
          <Tabs.Border />
          <Tabs.Trigger theme="white" value="1">
            포트폴리오
          </Tabs.Trigger>
          <Tabs.Trigger theme="white" value="2">
            프로젝트
          </Tabs.Trigger>
          <Tabs.Trigger theme="white" value="3">
            스터디
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="1" css={tabContentCss}>
          {mine && (
            <Button
              size="md"
              theme="grey"
              variant="filled"
              css={{ color: palettes.white, width: '100%', marginBottom: 60 }}
            >
              입력하기
            </Button>
          )}

          {!hasPortfolio ? (
            <div>
              <div>Content</div>
              {/* <Spacing /> */}

              <div>Skills</div>
              {/* <Spacing /> */}

              <div>Links</div>
              {/* <Spacing /> */}
            </div>
          ) : (
            <div css={flex('center', '', 'column')}>
              <p
                css={[
                  {
                    marginBottom: 28,
                    color: palettes.primary.default,
                  },
                  fontCss.style.R16,
                ]}
              >
                아직 입력된 포트폴리오 내용이 없습니다.
              </p>
              <SsafyIcon.Track size={TrackSize.LG2} />
            </div>
          )}
        </Tabs.Content>
        <Tabs.Content value="2" css={tabContentCss}>
          <div>2</div>
        </Tabs.Content>
        <Tabs.Content value="3" css={tabContentCss}>
          <div>3</div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default ProfilePage;

const selfPaddingX = 15;

const selfCss = css({
  padding: `${topBarHeight + 30}px ${selfPaddingX}px ${gnbHeight}px`,
});

const myInfoCss = css(
  { marginBottom: 44 },
  flex('center', 'space-between', 'row')
);

const shortcutCss = css({ marginBottom: 50 }, flex('', 'center', 'column', 8));

const expandCss = css({
  width: 'auto',
  margin: `0 calc(-1 * (${globalVars.mainLayoutPaddingX.var} + ${selfPaddingX}px));`,
});

const tabContentCss = css({
  padding: '20px 0',
});
