import type { CustomNextPage } from 'next/types';
import type {
  MyRecruitApplicationDetail,
  RecruitDetail,
} from '~/services/recruit';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { BreadCrumbs, breadcrumbsHeight } from '~/components/BreadCrumbs';
import { Button } from '~/components/Common/Button';
import { FullPageLoader } from '~/components/Common/FullPageLoader';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { RecruitApplyForm } from '~/components/Forms/RecruitApplyForm';
import { RecruitApplyFormHeader } from '~/components/Forms/RecruitApplyForm/RecruitApplyFormHeader';
import { useModal } from '~/components/GlobalModal';
import RedirectionGuide from '~/components/RedirectionGuide';
import TitleBar from '~/components/TitleBar';
import {
  getRecruitThemeByCategory,
  MatchStatus,
  useCancelRecruitApplication,
  useMyRecruitApplication,
  useRecruitDetail,
} from '~/services/recruit';
import { titleBarHeight } from '~/styles/utils';
import {
  createAuthGuard,
  createNoIndexPageMetaData,
  customToast,
  getErrorResponse,
  handleAxiosError,
  noop,
  routes,
} from '~/utils';

// MatchStatus
// 그 외 -> 페이지 조회 가능

interface MyRecruitApplicationPageProps {
  recruitId?: number;
}

const metaTitle = '내 리쿠르팅 신청서';
const MyRecruitApplicationPage: CustomNextPage<
  MyRecruitApplicationPageProps
> = (props) => {
  const router = useRouter();
  const query = router.query as Params;
  const recruitId = props.recruitId ?? Number(query.recruitId);

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
  const { recruitType: appliedRecruitPart, reply: answerToRecruitAuthor } =
    myRecruitApplication;

  // 내 리쿠르팅인 경우엔 지원이 불가능하므로, 페이지 조회도 불가능
  if (mine) {
    return (
      <RedirectionGuide
        title="Error"
        description="내 리쿠르팅에는 지원할 수 없습니다."
        redirectionText="리쿠르팅 상세 페이지로"
        redirectionTo={routes.recruit.detail(recruitId)}
      />
    );
  }

  return (
    <>
      <PageHeadingText text={metaTitle} />

      <div css={selfCss}>
        <TitleBar.Default
          title="리쿠르팅 신청내용"
          withoutClose
          footer={
            <BreadCrumbs
              entries={[
                {
                  name: '리쿠르팅 상세',
                  link: routes.recruit.detail(recruitId),
                },
                {
                  name: '내 신청서',
                  link: routes.recruit.applications.mine(recruitId),
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
          css={{ width: '100%' }}
          recruitDetail={recruitDetail}
          myRecruitApplication={myRecruitApplication}
        />
      </div>
    </>
  );
};

type Params = Partial<{
  recruitId: string;
}>;

const selfCss = css({
  padding: `${titleBarHeight + breadcrumbsHeight + 30}px 0`,
});

export default MyRecruitApplicationPage;
MyRecruitApplicationPage.auth = createAuthGuard();
MyRecruitApplicationPage.meta = createNoIndexPageMetaData(metaTitle);

// 액션 버튼
// PENDING -> 신청 취소 버튼         (모집 완료가 아닐 때만 보여줌)
// REJECTED | INITIAL -> 재신청 버튼 (모집 완료가 아닐 때만 보여줌)
// SUCCESS -> 버튼 없음
interface ActionButtonLayerProps {
  className?: string;
  recruitDetail: RecruitDetail;
  myRecruitApplication: MyRecruitApplicationDetail;
}

const ActionButtonLayer = (props: ActionButtonLayerProps) => {
  const { myRecruitApplication, recruitDetail } = props;
  const { matchStatus } = myRecruitApplication;
  const { finishedRecruit } = recruitDetail;

  return (
    <>
      {!finishedRecruit && (
        <>
          {matchStatus === MatchStatus.PENDING && (
            <ApplicationCancelButton {...props} />
          )}
          {matchStatus === MatchStatus.REJECTED && (
            <ReApplicationButton {...props} />
          )}
          {matchStatus === MatchStatus.INITIAL && (
            <ReApplicationButton {...props} />
          )}
        </>
      )}
    </>
  );
};

const ApplicationCancelButton = (props: ActionButtonLayerProps) => {
  const { className, recruitDetail, myRecruitApplication } = props;
  const { openModal, closeModal } = useModal();
  const { category, recruitId } = recruitDetail;
  const { recruitApplicationId } = myRecruitApplication;
  const recruitTheme = getRecruitThemeByCategory(category);
  const {
    mutateAsync: cancelRecruitApplication,
    isLoading: isCancelingRecruitApplication,
  } = useCancelRecruitApplication({
    recruitApplicationId,
    recruitId,
  });

  const handleCancelRecruitApplication = async () => {
    closeModal();
    try {
      await cancelRecruitApplication();
      customToast.success('리쿠르팅 신청이 취소되었습니다.');
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const handleOpenModal = () => {
    openModal('alert', {
      title: '알림',
      description: (
        <>
          <p>리쿠르팅 신청을 취소하시겠습니까?</p>
          <p>리쿠르팅 취소는 등록자에게 별도의 알림없이 취소됩니다</p>
        </>
      ),
      actionText: '네',
      cancelText: '아니오',
      onClickCancel: closeModal,
      onClickAction: handleCancelRecruitApplication,
    });
  };

  return (
    <Button
      size="lg"
      className={className}
      theme={recruitTheme}
      loading={isCancelingRecruitApplication}
      onClick={handleOpenModal}
    >
      리쿠르팅 신청 취소
    </Button>
  );
};

const ReApplicationButton = (props: ActionButtonLayerProps) => {
  const { className, recruitDetail } = props;
  const { recruitId, category } = recruitDetail;
  const recruitTheme = getRecruitThemeByCategory(category);

  return (
    <Button asChild size="lg" className={className} theme={recruitTheme}>
      <Link href={routes.recruit.apply(recruitId)}>다시 신청하기</Link>
    </Button>
  );
};
