import type { CustomNextPage } from 'next/types';
import type { RecruitApplyFormProps } from '~/components/Forms/RecruitApplyForm';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { useState } from 'react';

import { BreadCrumbs, breadcrumbsHeight } from '~/components/BreadCrumbs';
import { FullPageLoader } from '~/components/Common/FullPageLoader';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { Footer } from '~/components/Footer';
import { RecruitApplyForm } from '~/components/Forms/RecruitApplyForm';
import { RecruitApplyFormHeader } from '~/components/Forms/RecruitApplyForm/RecruitApplyFormHeader';
import RedirectionGuide from '~/components/RedirectionGuide';
import TitleBar from '~/components/TitleBar';
import { useMyInfo } from '~/services/member';
import {
  ApplicableMatchStatusSet,
  getRecruitThemeByCategory,
  useApplyRecruit,
  useRecruitDetail,
} from '~/services/recruit';
import { titleBarHeight } from '~/styles/utils';
import {
  createAuthGuard,
  createNoIndexPageMetaData,
  customToast,
  getErrorResponse,
  handleAxiosError,
  routes,
} from '~/utils';

// Guard
// 0. 로그인 -> isSignedIn
// 1. 현재 참여중이 아님 -> recruitDetail.matchStatus
// 2. 내 리쿠능르팅이 아님 -> recruitDetail.mine
// 3. 모집 완료가 아님 -> recruitDetail.isFinished

// Submit Error
// 지원파트 검증은 하지 않음 (실시간으로 달라질 수 있기 때문에)

const metaTitle = '리쿠르팅 신청';
const titleBarTitle = metaTitle;

const RecruitApplyPage: CustomNextPage = () => {
  const router = useRouter();
  const query = router.query as Params;
  const recruitId = Number(query.recruitId);
  const { data: myInfo } = useMyInfo();
  const isSignedIn = !!myInfo;
  const { mutateAsync: applyRecruit } = useApplyRecruit(recruitId);
  const [applied, setApplied] = useState(false);

  const {
    data: recruitDetail,
    isLoading: isRecruitDetailLoading,
    isError: isRecruitDetailError,
    error: recruitDetailError,
  } = useRecruitDetail(recruitId);

  if (isRecruitDetailLoading) {
    return <FullPageLoader text="리쿠르팅 정보를 불러오는 중입니다." />;
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

  const { category, mine, finishedRecruit, matchStatus } = recruitDetail;

  const recruitTheme = getRecruitThemeByCategory(category);

  if (applied) {
    return (
      <>
        <TitleBar.Default
          withoutBackward
          title="리쿠르팅 신청 완료"
          onClickClose={routes.recruit.detail(recruitId)}
        />
        <RedirectionGuide
          css={{ paddingTop: titleBarHeight }}
          theme={recruitTheme}
          title={
            <>
              <p>리쿠르팅 신청이</p>
              <p>완료되었습니다</p>
            </>
          }
          description={
            <>
              <p>마이페이지에서 리쿠르팅 신청을</p>
              <p>확인하실 수 있습니다</p>
            </>
          }
          redirectionText="마이페이지로 이동"
          redirectionTo={routes.recruit.appliedList({ category })}
        />
      </>
    );
  }

  if (finishedRecruit) {
    return (
      <RedirectionGuide
        title="지원할 수 없습니다"
        description="모집 기간이 아니거나 이미 모집이 완료되었습니다."
        redirectionText="리쿠르팅 상세 페이지로"
        redirectionTo={routes.recruit.detail(recruitDetail.recruitId)}
      />
    );
  }

  const isUnauthorized =
    !isSignedIn ||
    mine ||
    (matchStatus && !ApplicableMatchStatusSet.has(matchStatus));

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

  const onValidSubmit: RecruitApplyFormProps['onValidSubmit'] = async (
    formValues
  ) => {
    try {
      await applyRecruit(formValues);
      setApplied(true);
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const onInvalidSubmit: RecruitApplyFormProps['onInvalidSubmit'] = () => {
    customToast.clientError('올바르지 않은 입력이 있는지 확인해주세요.');
  };

  return (
    <>
      <PageHeadingText text={metaTitle} />

      <main css={selfCss}>
        <TitleBar.Default
          withoutClose
          title={titleBarTitle}
          footer={
            <BreadCrumbs
              entries={[
                {
                  name: '리쿠르팅 상세',
                  link: routes.recruit.detail(recruitId),
                },
                {
                  name: '신청하기',
                  link: routes.recruit.apply(recruitId),
                  active: true,
                },
              ]}
            />
          }
        />

        <RecruitApplyFormHeader
          css={{ marginBottom: 60 }}
          recruitDetail={recruitDetail}
        />

        <RecruitApplyForm
          recruitDetail={recruitDetail}
          onValidSubmit={onValidSubmit}
          onInvalidSubmit={onInvalidSubmit}
        />
      </main>

      <Footer />
    </>
  );
};

type Params = Partial<{
  recruitId: string;
}>;

const selfCss = css({
  padding: `${titleBarHeight + breadcrumbsHeight + 30}px 0`,
});

export default RecruitApplyPage;
RecruitApplyPage.auth = createAuthGuard();
RecruitApplyPage.meta = createNoIndexPageMetaData(metaTitle);
