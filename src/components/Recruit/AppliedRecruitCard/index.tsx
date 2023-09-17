import type { AppliedRecruitSummary } from '~/services/recruit';

import { css } from '@emotion/react';
import dayjs from 'dayjs';
import { memo } from 'react';
import Skeleton from 'react-loading-skeleton';

import { RecruitCard } from '~/components/Recruit/RecruitCard';
import { RecruitCardSkeleton } from '~/components/Recruit/RecruitCard/RecruitCardSkeleton';
import { MatchStatus } from '~/services/recruit';
import { flex, fontCss, palettes } from '~/styles/utils';

interface AppliedRecruitCardProps {
  appliedRecruit: AppliedRecruitSummary;
}

export const AppliedRecruitCard = memo((props: AppliedRecruitCardProps) => {
  const { appliedRecruit } = props;
  const { appliedAt, matchStatus } = appliedRecruit;

  const formattedAppliedAt = dayjs(appliedAt).format('YYYY년 MM월 DD일 신청');

  return (
    <div css={selfCss}>
      <div css={headerCss}>
        <div css={appliedAtCss}>{formattedAppliedAt}</div>
        <MatchStatusText matchStatus={matchStatus} />
      </div>
      <RecruitCard recruitSummary={appliedRecruit} size="md" />
    </div>
  );
});

const MatchStatusText = (props: { matchStatus: MatchStatus }) => {
  const { matchStatus } = props;

  return (
    <div>
      {matchStatus === MatchStatus.PENDING && (
        <span css={{ color: palettes.primary.default }}>대기 중</span>
      )}
      {matchStatus === MatchStatus.SUCCESS && (
        <span css={{ color: palettes.recruit.default }}>수락 됨</span>
      )}
      {matchStatus === MatchStatus.REJECTED && (
        <span css={{ color: palettes.secondary.default }}>거절 됨</span>
      )}
    </div>
  );
};

const selfCss = css({
  padding: '10px 25px',
  backgroundColor: palettes.background.grey,
});
const headerCss = css(
  { marginBottom: 10 },
  flex('center', 'space-between', 'row', 16),
  fontCss.style.B14
);

const appliedAtCss = css(fontCss.style.R14);

AppliedRecruitCard.displayName = 'AppliedRecruitCard';

export const AppliedRecruitCardSkeleton = () => {
  return (
    <div css={selfCss}>
      <div css={headerCss}>
        <Skeleton width={110} height={20} baseColor={palettes.grey3} />
        <Skeleton width={56} height={20} baseColor={palettes.grey3} />
      </div>
      <RecruitCardSkeleton size="md" />
    </div>
  );
};
