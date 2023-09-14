import type { CustomNextPage } from 'next/types';
import type {
  MyRecruitApplicationDetail,
  RecruitDetail,
} from '~/services/recruit';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { Button, FullPageLoader, PageHeadingText } from '~/components/Common';
import { RecruitApplyForm } from '~/components/Forms/RecruitApplyForm';
import { RecruitApplyFormHeader } from '~/components/Forms/RecruitApplyForm/RecruitApplyFormHeader';
import RedirectionGuide from '~/components/RedirectionGuide';
import TitleBar from '~/components/TitleBar';
import {
  getRecruitThemeByCategory,
  useMyRecruitApplication,
  useRecruitDetail,
} from '~/services/recruit';
import { titleBarHeight } from '~/styles/utils';
import {
  createAuthGuard,
  createNoIndexPageMetaData,
  getErrorResponse,
  noop,
  routes,
} from '~/utils';

// MatchStatus
// INITIAL -> 신청 페이지로 리다이렉션
// 그 외 -> 페이지 조회 가능

const metaTitle = '내 리쿠르팅 신청서';
const MyRecruitApplicationPage: CustomNextPage = () => {
  const router = useRouter();
  const query = router.query as Partial<Params>;
  const recruitId = Number(query.recruitId);

  const {
    data: recruitDetail,
    isLoading: isRecruitDetailLoading,
    isError: isRecruitDetailError,
    error: recruitDetailError,
  } = useRecruitDetail(recruitId);

  const {
    data: myRecruitApplication,
    isLoading: isMyRecruitApplicationLoading,
    isError: isMyRecruitApplicationError,
    error: myRecruitApplicationError,
  } = useMyRecruitApplication(recruitId);

  if (isRecruitDetailLoading || isMyRecruitApplicationLoading) {
    return <FullPageLoader text="데이터를 불러오는 중입니다." />;
  }

  if (isRecruitDetailError || isMyRecruitApplicationError) {
    const errorResponse =
      getErrorResponse(recruitDetailError) ||
      getErrorResponse(myRecruitApplicationError);

    const errorMessage =
      errorResponse?.message ??
      '리쿠르팅 데이터를 불러오는 중 오류가 발생했습니다.';

    // NOTE: 없는 리쿠르팅의 경우 리다이렉션 라우트를 다르게 가져가야함
    return (
      <RedirectionGuide
        title="Error"
        description={errorMessage}
        customLinkElements={
          <div>
            <Button asChild size="lg" css={{ marginBottom: 12 }}>
              <Link href={routes.recruit.detail(recruitId)}>
                리쿠르팅 상세 페이지로
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link href={routes.recruit.list()}>리쿠르팅 목록 페이지로</Link>
            </Button>
          </div>
        }
      />
    );
  }

  const { recruitType: appliedRecruitPart, reply: answerToRecruitAuthor } =
    myRecruitApplication;

  return (
    <>
      <PageHeadingText text={metaTitle} />

      <div css={selfCss}>
        <TitleBar.Default
          title="리쿠르팅 신청내용"
          withoutClose
          onClickBackward={routes.recruit.detail(recruitId)}
        />

        <RecruitApplyFormHeader
          css={{ marginBottom: 60 }}
          recruitDetail={recruitDetail}
        />

        <RecruitApplyForm
          css={{ marginBottom: 120 }}
          onValidSubmit={noop}
          recruitDetail={recruitDetail}
          options={{ readonly: true }}
          defaultValues={{
            agreeToProvideProfile: true,
            recruitPartToApply: appliedRecruitPart,
            answerToRecruitAuthor,
          }}
        />

        <ActionButtonLayer
          recruitDetail={recruitDetail}
          myRecruitApplication={myRecruitApplication}
        />
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

export default MyRecruitApplicationPage;
MyRecruitApplicationPage.auth = createAuthGuard();
MyRecruitApplicationPage.meta = createNoIndexPageMetaData(metaTitle);

// 액션 버튼
// PENDING -> 신청 취소 버튼
// REJECTED -> 재신청 버튼
// SUCCESS -> 버튼 없음
interface ActionButtonLayerProps {
  className?: string;
  recruitDetail: RecruitDetail;
  myRecruitApplication: MyRecruitApplicationDetail;
}

const ActionButtonLayer = (props: ActionButtonLayerProps) => {
  const { className, recruitDetail, myRecruitApplication } = props;
  const { category } = recruitDetail;
  const { matchStatus } = myRecruitApplication;
  const recruitTheme = getRecruitThemeByCategory(category);

  return (
    <Button
      size="lg"
      css={{ width: '100%' }}
      className={className}
      theme={recruitTheme}
    >
      버튼
    </Button>
  );
};
