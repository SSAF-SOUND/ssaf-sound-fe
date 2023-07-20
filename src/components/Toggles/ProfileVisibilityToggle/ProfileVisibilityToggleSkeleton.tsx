import { css } from '@emotion/react';
import Skeleton from 'react-loading-skeleton';

import { inlineFlex, palettes } from '~/styles/utils';

const ProfileVisibilityToggleSkeleton = () => {
  return (
    <Skeleton
      borderRadius={16}
      width={72}
      height={27}
      baseColor={palettes.background.grey}
      highlightColor={palettes.font.blueGrey}
      css={selfCss}
    />
  );
};

export default ProfileVisibilityToggleSkeleton;

const selfCss = css(
  { border: `1px solid ${palettes.font.blueGrey}` },
  inlineFlex('center', 'center')
);
