import { css } from '@emotion/react';

import { MatchStatus } from '~/services/recruit';
import { fontCss, inlineFlex, palettes } from '~/styles/utils';

interface MatchStatusTextProps {
  matchStatus: Exclude<MatchStatus, MatchStatus.WAITING_REGISTER_APPROVE>;
}
export const MatchStatusText = (props: MatchStatusTextProps) => {
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
