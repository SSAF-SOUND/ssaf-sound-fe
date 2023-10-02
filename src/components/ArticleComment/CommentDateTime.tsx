import { css } from '@emotion/react';

import { Separator } from '~/components/Common/Separator';
import { flex, fontCss, palettes } from '~/styles/utils';
import { formatDateTime } from '~/utils';

interface CommentDateTimeProps {
  createdAt: string;
}

const CommentDateTime = (props: CommentDateTimeProps) => {
  const { createdAt } = props;
  const { date, time } = formatDateTime(createdAt);
  return (
    <div css={dateTimeCss}>
      <span>{date}</span>
      <Separator
        orientation="vertical"
        backgroundColor={palettes.font.blueGrey}
        css={{ margin: '0 8px' }}
        height={12}
      />
      <span>{time}</span>
    </div>
  );
};

export default CommentDateTime;

const dateTimeCss = css(
  { color: palettes.font.blueGrey },
  fontCss.style.R12,
  flex('center', '', 'row')
);
