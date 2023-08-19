import { css } from '@emotion/react';

import { fontCss } from '~/styles/utils';

interface RecruitMetaTitleProps {
  title: string;
}

export const RecruitMetaTitle = (props: RecruitMetaTitleProps) => {
  const { title } = props;
  return <h2 css={selfCss}>{title}</h2>;
};

const selfCss = css(fontCss.family.auto, fontCss.style.B28);
