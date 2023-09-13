import type { CustomNextPage } from 'next/types';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import {
  DefaultFullPageLoader,
  loaderText,
  PageHead,
  PageHeadingText,
} from '~/components/Common';
import { RecruitApplyForm } from '~/components/Forms/RecruitApplyForm';
import Name from '~/components/Name';
import { Recruit } from '~/components/Recruit/Recruit';
import RedirectionGuide from '~/components/RedirectionGuide';
import TitleBar from '~/components/TitleBar';
import { useMyInfo } from '~/services/member';
import {
  getDisplayCategoryName,
  MatchStatus,
  useRecruitDetail,
} from '~/services/recruit';
import { expandCss, fontCss, palettes, titleBarHeight } from '~/styles/utils';
import {
  createAuthGuard,
  createNoIndexPageMetaData,
  getErrorResponse,
  routes,
} from '~/utils';

// Guard
// 0. 로그인 -> isSignedIn
// 1. 현재 참여중이 아님 -> recruitDetail.matchStatus
// 2. 내 리쿠르팅이 아님 -> recruitDetail.mine
// 3. 모집 완료가 아님 -> recruitDetail.isFinished

// Submit Error
// 지원파트 검증은 하지 않음 (실시간으로 달라질 수 있기 때문에)

const metaTitle = '리쿠르팅 신청';
const titleBarTitle = metaTitle;

const RecruitApplyPage: CustomNextPage = () => {
  const router = useRouter();
  const query = router.query as Partial<Params>;
  const recruitId = Number(query.recruitId);
  const { data: myInfo } = useMyInfo();
  const isSignedIn = !!myInfo;

  const {
    data: recruitDetail,
    isLoading: isRecruitDetailLoading,
    isError: isRecruitDetailError,
    error: recruitDetailError,
  } = useRecruitDetail(recruitId);

  if (isRecruitDetailLoading) {
    return <DefaultFullPageLoader text="리쿠르팅 정보를 불러오는 중입니다." />;
  }

  if (isRecruitDetailError) {
    const errorResponse = getErrorResponse(recruitDetailError);
    const errorMessage =
      errorResponse?.message ??
      '리쿠르팅 정보를 불러오는 중 오류가 발생했습니다.';

    return (
      <RedirectionGuide
        title="Error"
        description={errorMessage}
        redirectionText="리쿠르팅 게시글로"
        redirectionTo={routes.recruit.detail(recruitId)}
      />
    );
  }

  const { title, category, author, mine, finishedRecruit, matchStatus } =
    recruitDetail;

  if (finishedRecruit) {
    return (
      <RedirectionGuide
        title="종료된 리쿠르팅입니다"
        description="모집 기간이 아니거나 이미 모집이 완료되었습니다."
        redirectionText="리쿠르팅 상세 페이지로"
        redirectionTo={routes.recruit.detail(recruitDetail.recruitId)}
      />
    );
  }

  const isUnauthorized =
    !isSignedIn || mine || (matchStatus && matchStatus !== MatchStatus.INITIAL);

  if (isUnauthorized) {
    const message = !isSignedIn
      ? '로그인이 필요합니다.'
      : mine
      ? '내 리쿠르팅에는 지원할 수 없습니다.'
      : '이미 지원한 리쿠르팅입니다.';

    return (
      <RedirectionGuide
        title="지원할 수 없습니다"
        description={message}
        redirectionText="리쿠르팅 상세 페이지로"
        redirectionTo={routes.recruit.detail(recruitDetail.recruitId)}
      />
    );
  }

  const displayCategoryName = getDisplayCategoryName(category);

  return (
    <>
      <PageHeadingText text={metaTitle} />

      <div css={selfCss}>
        <TitleBar.Default
          withoutClose
          onClickBackward={routes.recruit.detail(recruitId)}
          title={titleBarTitle}
        />

        <div css={categoryCss}>{displayCategoryName}</div>

        <div css={[expandLayerCss, { marginBottom: 60 }]}>
          <Recruit.Title>{title}</Recruit.Title>
          <Name userInfo={author} size="md" />
          <Recruit.BasicInfo css={basicInfoCss} recruitDetail={recruitDetail} />
        </div>

        <div>
          <RecruitApplyForm
            recruitDetail={recruitDetail}
            onValidSubmit={() => console.log(1)}
          />
        </div>
      </div>
    </>
  );
};

type Params = {
  recruitId: string;
};

const selfCss = css({
  padding: `${titleBarHeight + 30}px 0`,
});

const categoryCss = css({ marginBottom: 10 }, fontCss.style.R14);

const expandLayerCss = css(
  {
    backgroundColor: palettes.background.grey,
    padding: '16px 20px',
  },
  expandCss()
);

const basicInfoCss = css({ padding: '16px 0 0' });

export default RecruitApplyPage;
RecruitApplyPage.auth = createAuthGuard();
RecruitApplyPage.meta = createNoIndexPageMetaData(metaTitle);
