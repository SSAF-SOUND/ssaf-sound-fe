import { css } from '@emotion/react';

import { fontCss, lineClamp } from '~/styles/utils';

interface RecruitTitleProps {
  title: string;
}
const RecruitTitle = ({ title }: RecruitTitleProps) => {
  return <h2 css={selfCss}>{title}</h2>;
};

const selfCss = css([
  fontCss.family.auto,
  fontCss.style.B20,
  {
    width: '70%',
    lineHeight: '22px',
    wordBreak: 'break-all',
  },
  lineClamp(1),
]);

export default RecruitTitle;
