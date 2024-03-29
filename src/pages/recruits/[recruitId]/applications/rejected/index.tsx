import type { CustomNextPage } from 'next/types';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { BreadCrumbs, breadcrumbsHeight } from '~/components/BreadCrumbs';
import { Button } from '~/components/Common/Button';
import { FullPageLoader } from '~/components/Common/FullPageLoader';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { Footer } from '~/components/Footer';
import { RecruitApplicantBar } from '~/components/RecruitApplicants';
import { RecruitApplicantsCount } from '~/components/RecruitApplicants/RecruitApplicantsCount';
import RedirectionGuide from '~/components/RedirectionGuide';
import TitleBar from '~/components/TitleBar';
import {
  useRecruitDetail,
  useRejectedRecruitApplicants,
} from '~/services/recruit';
import {
  flex,
  fontCss,
  pageCss,
  position,
  titleBarHeight,
} from '~/styles/utils';
import {
  createAuthGuard,
  createNoIndexPageMetaData,
  getErrorResponse,
  routes,
} from '~/utils';

const metaTitle = '거절한 신청 목록';
const titleBarTitle = metaTitle;

interface RejectedApplicantsPageProps {
  recruitId?: number;
}

const RejectedApplicantsPage: CustomNextPage<RejectedApplicantsPageProps> = (
  props
) => {
  const router = useRouter();
  const query = router.query as Partial<Params>;

  const recruitId = props.recruitId ?? Number(query.recruitId);

  const {
    data: recruitDetail,
    isLoading: isRecruitDetailLoading,
    isError: isRecruitDetailError,
    error: recruitDetailError,
  } = useRecruitDetail(recruitId);

  const {
    data: rejectedRecruitApplicants,
    isLoading: isRejectedRecruitApplicantsLoading,
    isError: isRejectedRecruitApplicantsError,
    error: rejectedRecruitApplicantsError,
  } = useRejectedRecruitApplicants(recruitId);

  if (isRejectedRecruitApplicantsLoading || isRecruitDetailLoading) {
    return <FullPageLoader text="리쿠르팅 데이터를 불러오는 중입니다." />;
  }

  if (isRejectedRecruitApplicantsError || isRecruitDetailError) {
    const errorResponse =
      getErrorResponse(rejectedRecruitApplicantsError) ??
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

  const rejectedApplicantsCount = rejectedRecruitApplicants.length;

  const isEmpty = rejectedApplicantsCount === 0;

  return (
    <>
      <PageHeadingText text={metaTitle} />

      <main css={selfCss}>
        <TitleBar.Default
          title={titleBarTitle}
          withoutClose
          footer={
            <BreadCrumbs
              entries={[
                {
                  name: '리쿠르팅 상세',
                  link: routes.recruit.detail(recruitId),
                },
                {
                  name: '신청 목록',
                  link: routes.recruit.applications.self(recruitId),
                },
                {
                  name: '거절한 신청 목록',
                  link: routes.recruit.applications.rejected(recruitId),
                  active: true,
                },
              ]}
            />
          }
        />

        <RecruitApplicantsCount
          title="리쿠르팅 거절"
          count={rejectedApplicantsCount}
          css={{ marginBottom: 20 }}
        />

        {isEmpty && <div css={emptyCss}>거절한 리쿠르팅 목록이 없습니다.</div>}

        {!isEmpty &&
          rejectedRecruitApplicants.map((applicant) => {
            return (
              <RecruitApplicantBar
                key={applicant.author.memberId}
                recruitId={recruitId}
                applicant={applicant}
                withLikeButton={false}
              />
            );
          })}
      </main>

      <Footer />
    </>
  );
};

type Params = {
  recruitId: string;
};

const selfPaddingY = titleBarHeight + breadcrumbsHeight + 30;
const selfCss = css(
  {
    padding: `${selfPaddingY}px 0`,
  },
  pageCss.minHeight,
  flex('', '', 'column')
);

const emptyCss = css(
  {
    flexGrow: 1,
  },
  fontCss.style.R14,
  position.xy('center', 'center')
);

export default RejectedApplicantsPage;
RejectedApplicantsPage.auth = createAuthGuard();
RejectedApplicantsPage.meta = createNoIndexPageMetaData(metaTitle);
