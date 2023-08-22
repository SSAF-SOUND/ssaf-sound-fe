import type { SerializedStyles } from '@emotion/react';

import { css } from '@emotion/react';

import { fontCss, palettes } from '~/styles/utils';

type Status = 'confirmed' | 'waiting' | 'declined';
interface PrefixTypes {
  status: Status;
}

export const Prefix = ({ status = 'confirmed' }: PrefixTypes) => {
  const STATUS = {
    confirmed: '확정',
    waiting: '대기중',
    declined: '참여 안함',
  };

  return <span css={[selfCss, statusCss[status]]}>{STATUS[status]}</span>;
};

const selfCss = css(
  {
    display: 'inline-block',
    wordBreak: 'keep-all',
  },
  fontCss.family.auto,
  fontCss.style.B12
);

const statusCss: Record<Status, SerializedStyles> = {
  confirmed: css({
    background: palettes.recruit.default,
    color: palettes.black,
    borderRadius: 8,
    padding: '3px 5px',
  }),
  waiting: css({
    color: palettes.recruit.default,
  }),
  declined: css({
    color: palettes.white,
  }),
};
