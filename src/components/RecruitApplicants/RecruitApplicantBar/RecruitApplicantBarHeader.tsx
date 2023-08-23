import { css } from '@emotion/react';

import { Icon } from '~/components/Common';
import { MatchStatus } from '~/services/recruit';
import { fontCss, inlineFlex, palettes } from '~/styles/utils';

interface RecruitApplicantBarHeaderProps {
  matchStatus: MatchStatus;
  liked?: boolean;
}

export const RecruitApplicantBarHeader = (
  props: RecruitApplicantBarHeaderProps
) => {
  const { matchStatus, liked } = props;

  const touched = matchStatus !== MatchStatus.WAITING_REGISTER_APPROVE;

  return (
    <div css={selfCss}>
      {!touched && <LikeIndicator liked={liked} />}
      {touched && <StatusText matchStatus={matchStatus} />}
    </div>
  );
};

const selfCss = css(
  {
    width: 46,
    flexShrink: 0,
  },
  inlineFlex('center', 'center')
);

const LikeIndicator = (props: { liked?: boolean }) => {
  const { liked } = props;

  return <Icon name={liked ? 'heart' : 'heart.outlined'} size={24} />;
};

const StatusText = (props: {
  matchStatus: Exclude<MatchStatus, MatchStatus.WAITING_REGISTER_APPROVE>;
}) => {
  const { matchStatus } = props;

  return (
    <div css={[statusTextSelfCss, statusCss[matchStatus]]}>
      {statusText[matchStatus]}
    </div>
  );
};

const statusText = {
  [MatchStatus.WAITING_APPLICANT]: '대기중',
  [MatchStatus.CANCEL]: '참여안함',
  [MatchStatus.DONE]: '확정',
  [MatchStatus.REJECT]: undefined,
};

const statusTextSelfCss = css(
  fontCss.style.B12,
  {
    padding: '4px 6px',
    color: palettes.recruit.default,
    borderRadius: 8,
    wordBreak: 'keep-all',
  },
  inlineFlex('center', 'center')
);

const statusCss = {
  [MatchStatus.WAITING_APPLICANT]: undefined,
  [MatchStatus.CANCEL]: css({
    color: palettes.font.blueGrey,
  }),
  [MatchStatus.DONE]: css({
    backgroundColor: palettes.recruit.default,
    color: palettes.font.grey,
  }),
  [MatchStatus.REJECT]: undefined,
};
