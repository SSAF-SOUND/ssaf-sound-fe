import { css } from '@emotion/react';

import { MatchStatus } from '~/services/recruit';
import { fontCss, inlineFlex, palettes } from '~/styles/utils';

interface MatchStatusTextProps {
  matchStatus: Exclude<MatchStatus, MatchStatus.PENDING>;
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
  [MatchStatus.PENDING]: '대기중',
  [MatchStatus.REJECTED]: '참여안함',
  [MatchStatus.SUCCESS]: '확정',
  [MatchStatus.INITIAL]: undefined,
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
  [MatchStatus.PENDING]: undefined,
  [MatchStatus.REJECTED]: css({
    color: palettes.font.blueGrey,
  }),
  [MatchStatus.SUCCESS]: css({
    backgroundColor: palettes.recruit.default,
    color: palettes.font.grey,
  }),
  [MatchStatus.INITIAL]: undefined,
};
