import type { CustomNextPage } from 'next/types';
import type {
  RecruitApplicationDetail,
  RecruitDetail,
} from '~/services/recruit';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { Button, FullPageLoader, PageHeadingText } from '~/components/Common';
import { RecruitApplyForm } from '~/components/Forms/RecruitApplyForm';
import { FullDateTime } from '~/components/FullDateTime';
import NameCard from '~/components/NameCard';
import { RecruitApplicantLikeButton } from '~/components/RecruitApplicants/RecruitApplicantBar/RecruitApplicantLikeButton';
import RedirectionGuide from '~/components/RedirectionGuide';
import TitleBar from '~/components/TitleBar';
import {
  MatchStatus,
  RecruitParts,
  useApproveRecruitApplication,
  useLikeRecruitApplication,
  useRecruitApplication,
  useRecruitDetail,
  useRejectRecruitApplication,
} from '~/services/recruit';
import { flex, palettes, Theme, titleBarHeight } from '~/styles/utils';
import {
  createAuthGuard,
  createNoIndexPageMetaData,
  getErrorResponse,
  handleAxiosError,
  noop,
  routes,
} from '~/utils';

interface RecruitApplicationPageProps {
  recruitId?: number;
  recruitApplicationId?: number;
}

const metaTitle = '리쿠르팅 신청서';
const titleBarTitle = metaTitle;
const RecruitApplicationPage: CustomNextPage<RecruitApplicationPageProps> = (
  props
) => {
  const router = useRouter();
  const query = router.query as Partial<Params>;
  const recruitApplicationId =
    props.recruitApplicationId ?? Number(query.recruitApplicationId);
  const recruitId = props.recruitId ?? Number(query.recruitId);

  const {
    data: recruitApplication,
    isLoading: isRecruitApplicationLoading,
    isError: isRecruitApplicationError,
    error: recruitApplicationError,
  } = useRecruitApplication({ recruitApplicationId, recruitId });
  const {
    data: recruitDetail,
    isLoading: isRecruitDetailLoading,
    isError: isRecruitDetailError,
    error: recruitDetailError,
  } = useRecruitDetail(recruitId);

  const {
    mutateAsync: likeRecruitApplication,
    isLoading: isLikingRecruitApplication,
  } = useLikeRecruitApplication({
    recruitApplicationId,
    recruitId,
    // 페이지가 로딩되었을 때는 `recruitPart`가 항상 존재하기 때문에, 로딩중일 때는 의미 없는 `FRONTEND` 값을 임시로 채워 넣음
    recruitPart: recruitApplication?.recruitType || RecruitParts.FRONTEND,
  });

  if (isRecruitDetailLoading || isRecruitApplicationLoading) {
    return <FullPageLoader text="데이터를 불러오는 중입니다." />;
  }

  if (isRecruitDetailError || isRecruitApplicationError) {
    const errorResponse =
      getErrorResponse(recruitDetailError) ||
      getErrorResponse(recruitApplicationError);

    const errorMessage =
      errorResponse?.message ??
      '리쿠르팅 신청 내역 데이터를 불러오는 중 오류가 발생했습니다.';

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

  const { mine } = recruitDetail;
  const {
    appliedAt,
    author: applicantInfo,
    liked,
    reply: answerToRecruitAuthor,
    recruitType: recruitPartToApply,
  } = recruitApplication;

  if (!mine) {
    return (
      <RedirectionGuide
        title="권한이 없어요"
        description="내 리쿠르팅의 신청 내역만 확인 가능합니다."
        redirectionText="리쿠르팅 상세 페이지로"
        redirectionTo={routes.recruit.detail(recruitId)}
      />
    );
  }

  const onLikedChange = async () => {
    try {
      await likeRecruitApplication();
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <>
      <PageHeadingText text={metaTitle} />

      <div css={selfCss}>
        <TitleBar.Default
          title={titleBarTitle}
          withoutClose
          onClickBackward={routes.recruit.applications.self(recruitId)}
        />

        <header css={[headerCss, { marginBottom: 60 }]}>
          <FullDateTime dateTimeString={appliedAt} />

          <div css={[applicantCss, { marginBottom: 30 }]}>
            <NameCard userInfo={applicantInfo} />
            <RecruitApplicantLikeButton
              liked={liked}
              onLikedChange={onLikedChange}
              loading={isLikingRecruitApplication}
              showLoadingSpinner={false}
            />
          </div>

          <Button
            theme="grey"
            size="md"
            css={{ color: palettes.white }}
            asChild
          >
            <Link href={routes.profile.detail(applicantInfo.memberId)}>
              포트폴리오 보러 가기
            </Link>
          </Button>
        </header>

        <RecruitApplyForm
          css={{ marginBottom: 80 }}
          recruitDetail={recruitDetail}
          onValidSubmit={noop}
          options={{
            readonly: true,
          }}
          defaultValues={{
            agreeToProvideProfile: true,
            answerToRecruitAuthor,
            recruitPartToApply,
          }}
        />

        <ActionButtonLayer
          css={{ width: '100%' }}
          recruitDetail={recruitDetail}
          recruitApplication={recruitApplication}
        />
      </div>
    </>
  );
};

type Params = Partial<{
  recruitId: string;
  recruitApplicationId: string;
}>;

const selfCss = css({
  padding: `${titleBarHeight + 30}px 0`,
});
const headerCss = css(flex('', '', 'column', 8));
const applicantCss = css(flex('center', 'space-between', 'row', 12));

export default RecruitApplicationPage;
RecruitApplicationPage.auth = createAuthGuard();
RecruitApplicationPage.meta = createNoIndexPageMetaData(metaTitle);

// PENDING -> 수락 & 거절 버튼
// REJECTED -> 거절함
// SUCCESS -> 수락함 + 멤버제외 버튼

interface ActionButtonLayerProps {
  className?: string;
  recruitDetail: RecruitDetail;
  recruitApplication: RecruitApplicationDetail;
}
const ActionButtonLayer = (props: ActionButtonLayerProps) => {
  const { recruitDetail, recruitApplication, className } = props;
  const { matchStatus, recruitApplicationId } = recruitApplication;
  const { finishedRecruit, recruitId } = recruitDetail;
  const {
    mutateAsync: approveRecruitApplication,
    isLoading: isApprovingRecruitApplication,
  } = useApproveRecruitApplication(recruitId);
  const {
    mutateAsync: rejectRecruitApplication,
    isLoading: isRejectingRecruitApplication,
  } = useRejectRecruitApplication(recruitId);

  const handleApprove = async () => {
    try {
      await approveRecruitApplication(recruitApplicationId);
    } catch (err) {
      handleAxiosError(err);
    }
  };
  const handleReject = async () => {
    try {
      await rejectRecruitApplication(recruitApplicationId);
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <div css={actionButtonLayerCss} className={className}>
      {matchStatus === MatchStatus.INITIAL && finishedRecruit && (
        <div css={inactiveButtonCss}>응답 안함</div>
      )}

      {matchStatus === MatchStatus.PENDING && !finishedRecruit && (
        <>
          <Button
            onClick={handleReject}
            loading={isRejectingRecruitApplication}
            theme={Theme.RECRUIT}
            variant="inverse"
            size="lg"
          >
            거절
          </Button>
          <Button
            onClick={handleApprove}
            loading={isApprovingRecruitApplication}
            theme={Theme.RECRUIT}
            size="lg"
          >
            수락
          </Button>
        </>
      )}
      {matchStatus === MatchStatus.REJECTED && (
        <div css={inactiveButtonCss}>거절함</div>
      )}
      {matchStatus === MatchStatus.SUCCESS && (
        <div css={inactiveButtonCss}>수락함</div>
      )}
    </div>
  );
};

const actionButtonLayerCss = css(
  {
    '& > button': { width: '50%' },
  },
  flex('center', '', 'row', 16)
);

const inactiveButtonCss = css(
  {
    width: '100%',
    pointerEvents: 'none',
    cursor: 'initial',
    border: `1px solid ${palettes.recruit.default}`,
    color: palettes.recruit.default,
    borderRadius: 10,
    height: 56,
  },
  flex('center', 'center')
);
