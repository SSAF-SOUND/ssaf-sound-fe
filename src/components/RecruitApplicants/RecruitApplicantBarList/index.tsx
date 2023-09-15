import type { RecruitApplicant, RecruitParts } from '~/services/recruit';

import { css } from '@emotion/react';
import { memo, useState } from 'react';

import { Button } from '~/components/Common';
import { RecruitApplicantBar } from '~/components/RecruitApplicants';
import { RecruitApplicantsSortToggle } from '~/components/RecruitApplicants/RecruitApplicantsSortToggle';
import { flex, fontCss, palettes } from '~/styles/utils';
import { compareDates } from '~/utils';

interface RecruitApplicantBarListProps {
  applicants: RecruitApplicant[];
  // 더보기를 누르기 전에 보여줄 지원자 수
  initialVisibleCount?: number;
  recruitId: number;
  recruitPart: RecruitParts;
}

export const RecruitApplicantBarList = memo(
  (props: RecruitApplicantBarListProps) => {
    const {
      applicants,
      initialVisibleCount = 3,
      recruitId,
      recruitPart,
    } = props;
    const [sortLikedApplicantsFirst, setSortLikedApplicantsFirst] =
      useState(false);
    const [loadMore, setLoadMore] = useState(false);

    // 최신순 - 좋아요+최신순
    const sortedLikedApplicants = sortLikedApplicantsFirst
      ? [...applicants].sort((a, b) => {
          if (a.liked === b.liked) {
            return compareDates(b.appliedAt, a.appliedAt);
          }
          return a.liked ? -1 : 1;
        })
      : [...applicants].sort((a, b) => compareDates(b.appliedAt, a.appliedAt));

    const applicantsCount = sortedLikedApplicants.length;
    const hasApplicants = applicantsCount > 0;
    const visibleCount = loadMore
      ? sortedLikedApplicants.length
      : initialVisibleCount;
    const visibleApplicants = sortedLikedApplicants.slice(0, visibleCount);
    const onClickLoadMore = () => setLoadMore(true);
    const showLoadMoreButton = !loadMore && applicantsCount > visibleCount;

    if (!hasApplicants) {
      return (
        <div css={{ padding: '80px 0' }}>
          <p css={[{ textAlign: 'center' }, fontCss.style.B14]}>
            아직 신청자가 없습니다.
          </p>
        </div>
      );
    }

    return (
      <div css={selfCss}>
        <div css={likeContainerCss}>
          <RecruitApplicantsSortToggle
            pressed={sortLikedApplicantsFirst}
            onPressedChange={(pressed) => setSortLikedApplicantsFirst(pressed)}
          />
        </div>

        <ol css={recruitApplicantBarListCss}>
          {visibleApplicants.map((applicant) => (
            <RecruitApplicantBar
              recruitPart={recruitPart}
              key={applicant.author.memberId}
              recruitId={recruitId}
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

const likeContainerCss = css(
  { marginBottom: 12 },
  flex('center', 'flex-end', 'row')
);
