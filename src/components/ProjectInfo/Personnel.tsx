import type { LimitType } from '~/services/recruit';

import { css } from '@emotion/react';

import { themeColorVars } from '~/styles/utils';

interface PersonnelProps extends LimitType {}

const Personnel = (props: PersonnelProps) => {
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

export default Personnel;
