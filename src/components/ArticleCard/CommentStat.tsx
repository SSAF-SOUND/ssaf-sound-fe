import { css } from '@emotion/react';

import { Icon } from '~/components/Common/Icon';
import { inlineFlex, palettes } from '~/styles/utils';

interface CommentStatProps {
  count: number;
}

const CommentStat = (props: CommentStatProps) => {
  const { count } = props;
  return (
    <div css={selfCss}>
      <Icon name="chat.rect" size={20} />
      <span>{count}</span>
    </div>
  );
};

export default CommentStat;

const selfCss = css(
  {
    color: palettes.secondary.default,
  },
  inlineFlex('center', '', 'row', 4)
);
