import { css } from '@emotion/react';
import Skeleton from 'react-loading-skeleton';

import { palettes } from '~/styles/utils';

export const RecruitCardSkeleton = () => {
  return (
    <Skeleton
      baseColor={palettes.grey3}
      highlightColor={palettes.white}
      // enableAnimation={false}
      css={selfCss}
    />
  );
};

const selfCss = css({
  width: '100%',
  height: 130,
  borderRadius: 30,
});
