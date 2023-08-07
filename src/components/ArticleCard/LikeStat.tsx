import { css } from '@emotion/react';

import { Icon } from '~/components/Common';
import { inlineFlex, palettes } from '~/styles/utils';

interface LikeIconProps {
  count: number;
}

const LikeStat = (props: LikeIconProps) => {
  const { count } = props;
  return (
    <div css={selfCss}>
      <Icon name="like.outline" size={20} />
      <span>{count}</span>
    </div>
  );
};

export default LikeStat;
const selfCss = css(
  {
    color: palettes.primary.default,
  },
  inlineFlex('center', '', 'row', 4)
);
