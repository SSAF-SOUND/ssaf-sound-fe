import { css } from '@emotion/react';

import { fontCss } from '~/styles/utils';

interface RecruitTitleProps {
  title: string;
}

export const RecruitTitle = (props: RecruitTitleProps) => {
  const { title } = props;
  return <h3 css={selfCss}>{title}</h3>;
};

const selfCss = css(fontCss.family.auto, fontCss.style.B24);
