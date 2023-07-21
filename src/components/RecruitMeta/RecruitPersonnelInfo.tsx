import type { LimitType } from '~/services/recruit';

import { css } from '@emotion/react';

import { themeColorVars } from '~/styles/utils';

interface RecruitPersonnelInfoProps extends LimitType {}
const RecruitPersonnelInfo = (props: RecruitPersonnelInfoProps) => {
  const { limit, recruitType, currentNumber } = props;
  return (
    <span>
      {recruitType}{' '}
      <span data-theme="recruit" css={pointCss}>
        {currentNumber}
      </span>
      /<span>{limit}명</span>
    </span>
  );
};

const pointCss = css({
  color: themeColorVars.mainColor.var,
});

export default RecruitPersonnelInfo;
