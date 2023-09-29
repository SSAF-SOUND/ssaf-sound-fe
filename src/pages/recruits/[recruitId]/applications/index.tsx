import type { CustomNextPage } from 'next/types';
import type { RecruitApplicant, RecruitParts } from '~/services/recruit';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import {
  Button,
  FullPageLoader,
  loaderText,
  PageHeadingText,
} from '~/components/Common';
import {
  RecruitCompletedBar,
  recruitCompletedBarHeight,
} from '~/components/Recruit/RecruitCompletedBar';
import {
  RecruitApplicantsDetail,
  RecruitApplicantsAccordion,
} from '~/components/RecruitApplicants';
import RedirectionGuide from '~/components/RedirectionGuide';
import TitleBar from '~/components/TitleBar';
import {
  getDisplayCategoryName,
  RecruitCategoryName,
  useRecruitApplicants,
  useRecruitDetail,
} from '~/services/recruit';
import {
  fixTopCenter,
  flex,
  fontCss,
  palettes,
  titleBarHeight,
} from '~/styles/utils';
import {
  createAuthGuard,
  createNoIndexPageMetaData,
  getErrorResponse,
  routes,
} from '~/utils';

const metaTitle = '리쿠르팅 신청 목록';
const titleBarTitle = metaTitle;

type Params = Partial<{
  recruitId: string;
}>;

interface RecruitApplicantsPageProps {
  recruitId?: number;
}

/**
 * NOTE: 내 리쿠르트인 경우에만 접근 가능한 페이지 (서버에서 검증)
 */
const RecruitApplicantsPage: CustomNextPage<RecruitApplicantsPageProps> = (
  props
) => {
  const router = useRouter();
  const query = router.query as Params;
  const recruitId = props.recruitId ?? Number(query.recruitId);

  const {
    data: recruitApplicants,
    isLoading: isRecruitApplicantsLoading,
    isError: isRecruitApplicantsError,
    error: recruitApplicantsError,
  } = useRecruitApplicants(recruitId);

  const {
    data: recruitDetail,
    isLoading: isRecruitDetailLoading,
    isError: isRecruitDetailError,
    error: recruitDetailError,
  } = useRecruitDetail(recruitId);

  if (isRecruitApplicantsLoading || isRecruitDetailLoading) {
    return <FullPageLoader text={loaderText.loadingData} />;
  }

  if (isRecruitApplicantsError || isRecruitDetailError) {
    const errorResponse =
      getErrorResponse(recruitApplicantsError) ??
      getErrorResponse(recruitDetailError);
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

  const isUnauthorized = !recruitDetail.mine;

  if (isUnauthorized) {
    router.replace(routes.unauthorized());
    return (
      <RedirectionGuide
        title="권한이 없어요"
        description="내 리쿠르팅인 경우에만 확인할 수 있습니다."
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

  const { category, finishedRecruit } = recruitDetail;
  const isCategoryStudy = category === RecruitCategoryName.STUDY;

  const partAndApplicantsEntries = Object.entries(
    recruitApplicants.recruitApplications
  ) as Array<[RecruitParts, RecruitApplicant[]]>;

  return (
    <>
      <PageHeadingText text={metaTitle} />

      <div css={[selfCss, finishedRecruit && extendPaddingTopCss]}>
        <TitleBar.Default
          title={titleBarTitle}
          withoutClose
          onClickBackward={routes.recruit.detail(recruitId)}
        />

        {finishedRecruit && <RecruitCompletedBar css={completedBarCss} />}

        <div css={headerCss}>
          <p css={categoryNameCss}>
            {getDisplayCategoryName(recruitDetail.category)}
          </p>
          <p css={titleCss}>{recruitDetail.title}</p>
        </div>

        <RecruitApplicantsAccordion.Root isStudy={isCategoryStudy}>
          {partAndApplicantsEntries.map(([part, applicants]) => (
            <RecruitApplicantsDetail
              key={part}
              part={part}
              applicants={applicants}
              recruitDetail={recruitDetail}
            />
          ))}
        </RecruitApplicantsAccordion.Root>
      </div>
    </>
  );
};

const selfPaddingY = titleBarHeight + 10;
const selfCss = css({
  padding: `${selfPaddingY}px 0`,
});

const extendPaddingTopCss = css({
  paddingTop: `${selfPaddingY + recruitCompletedBarHeight}px`,
});
const completedBarCss = css(fixTopCenter, {
  top: titleBarHeight,
});

const headerCss = css(
  {
    padding: '0 5px',
    marginBottom: 16,
    color: palettes.font.blueGrey,
    wordBreak: 'break-word',
  },
  fontCss.style.R14,
  flex('center', '', 'row', 16)
);

const categoryNameCss = css({
  flexShrink: 0,
});

const titleCss = css({
  color: palettes.white,
});

export default RecruitApplicantsPage;
RecruitApplicantsPage.auth = createAuthGuard();
RecruitApplicantsPage.meta = createNoIndexPageMetaData(metaTitle);
