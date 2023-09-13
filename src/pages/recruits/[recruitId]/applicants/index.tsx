import type { CustomNextPage } from 'next/types';
import type { RecruitParts } from '~/services/recruit';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import {
  DefaultFullPageLoader,
  loaderText,
  PageHeadingText,
} from '~/components/Common';
import {
  RecruitApplicantsDetail,
  RecruitApplicantsAccordion,
} from '~/components/RecruitApplicants';
import TitleBar from '~/components/TitleBar';
import { useRecruitApplicants, useRecruitDetail } from '~/services/recruit';
import { flex, fontCss, palettes, titleBarHeight } from '~/styles/utils';
import { createAuthGuard, createNoIndexPageMetaData, routes } from '~/utils';

const metaTitle = '리쿠르팅 신청 목록';

type QueryString = {
  id: string;
};

/**
 * NOTE: 내 리쿠르트인 경우에만 접근 가능한 페이지 (서버에서 검증)
 */
const RecruitApplicantsPage: CustomNextPage = () => {
  const router = useRouter();
  const query = router.query as QueryString;
  const recruitId = Number(query.id);

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
    return <DefaultFullPageLoader text={loaderText.loadingData} />;
  }

  if (isRecruitApplicantsError || isRecruitDetailError) {
    // NOTE: unauthorized error인 경우 redirect, 그 외에는 데이터 로딩 실패 페이지
    const isUnauthorized = true as boolean;

    if (isUnauthorized) {
      router.replace(routes.unauthorized());
      return <DefaultFullPageLoader />;
    }

    return <div>Fail to load</div>;
  }

  const partAndApplicantsEntries = Object.entries(
    recruitApplicants.recruitApplications
  );

  return (
    <>
      <PageHeadingText text={metaTitle} />

      <div css={selfCss}>
        <TitleBar.Default
          title="리쿠르팅 신청 목록"
          withoutClose
          onClickBackward={routes.recruit.detail(recruitId)}
        />
        <div css={headerCss}>
          <p css={categoryNameCss}>{recruitDetail.category}</p>
          <p css={titleCss}>{recruitDetail.title}</p>
        </div>
        <RecruitApplicantsAccordion.Root>
          {partAndApplicantsEntries.map(([part, applicants]) => (
            <RecruitApplicantsDetail
              key={part}
              part={part as RecruitParts}
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
  padding: `${selfPaddingY}px 15px`,
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
