import type { RecruitApplicant } from '~/services/recruit';

import { css } from '@emotion/react';
import { memo, useState } from 'react';

import { Button } from '~/components/Common';
import { RecruitApplicantBar } from '~/components/RecruitApplicants';
import { flex, fontCss, palettes } from '~/styles/utils';

interface RecruitApplicantBarListProps {
  applicants: RecruitApplicant[];
  // 더보기를 누르기 전에 보여줄 지원자 수
  initialVisibleCount?: number;
}

export const RecruitApplicantBarList = memo(
  (props: RecruitApplicantBarListProps) => {
    const { applicants, initialVisibleCount = 3 } = props;
    const [loadMore, setLoadMore] = useState(false);

    const applicantsCount = applicants.length;
    const hasApplicants = applicantsCount > 0;
    const visibleCount = loadMore ? applicants.length : initialVisibleCount;
    const visibleApplicants = applicants.slice(0, visibleCount);
    const onClickLoadMore = () => setLoadMore(true);
    const showLoadMoreButton = !loadMore && applicantsCount > visibleCount;

    if (!hasApplicants) {
      return (
        <div css={{ padding: '80px 0' }}>
          <p css={{ textAlign: 'center' }}>아직 신청자가 없습니다.</p>
        </div>
      );
    }

    return (
      <div css={selfCss}>
        <ol css={recruitApplicantBarListCss}>
          {visibleApplicants.map((applicant) => (
            <RecruitApplicantBar
              key={applicant.author.memberId}
              applicant={applicant}
            />
          ))}
        </ol>

        {showLoadMoreButton && (
          <Button
            variant="literal"
            theme="recruit"
            css={loadMoreButtonCss}
            onClick={onClickLoadMore}
          >
            더보기
          </Button>
        )}
      </div>
    );
  }
);

RecruitApplicantBarList.displayName = 'RecruitApplicantBarList';

const loadMoreButtonCss = css(
  {
    color: palettes.recruit.default,
    margin: '0 auto',
  },
  fontCss.style.R16
);

const selfCss = flex('', '', 'column', 28);

const recruitApplicantBarListCss = css(flex('', '', 'column', 12));
