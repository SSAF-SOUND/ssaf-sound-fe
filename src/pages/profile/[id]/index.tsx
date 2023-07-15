import type { CustomNextPage } from 'next/types';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { Button, SsafyIcon, Tabs, TrackSize } from '~/components/Common';
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

const ProfilePage: CustomNextPage = () => {
  const router = useRouter();
  const { id } = router.query as { id?: string };
  const { data: myInfo } = useMyInfo();
  const hasPortfolio = true as boolean;
  const mine = true as boolean;

  // id로 프로필 조회
  // const { data: userInfo } = useUserInfo(id);
  // const mine = userInfo && myInfo && (userInfo.memberId === myInfo.memberId)

  return (
    <div css={selfCss}>
      <div css={myInfoCss}>
        NameCard
        {/* <NameCard />  */}
        {/* <Icon name="setting" /> */}
      </div>

      {mine && (
        <div css={shortcutCss}>
          <Profile.ShortCut
            css={expandWidthCss}
            iconName="bookmark.outline"
            href="#"
            text="나의 스크랩"
          />

          <Profile.ShortCut
            css={expandWidthCss}
            iconName="document"
            href="#"
            text="내가 작성한 게시글"
          />
        </div>
      )}

      <Tabs.Root defaultValue="1">
        <Tabs.List css={expandWidthCss}>
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
              size="sm"
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
ProfilePage.navigation = true;

const selfPaddingX = 15;

const selfCss = css({
  padding: `${topBarHeight + 30}px ${selfPaddingX}px ${gnbHeight}px`,
});

const myInfoCss = css({ marginBottom: 44 });

const shortcutCss = css({ marginBottom: 50 }, flex('', 'center', 'column', 8));

const expandWidthCss = css({
  width: 'auto',
  margin: `0 calc(-1 * (${globalVars.mainLayoutPaddingX.var} + ${selfPaddingX}px));`,
});

const tabContentCss = css({
  padding: '20px 0',
});
