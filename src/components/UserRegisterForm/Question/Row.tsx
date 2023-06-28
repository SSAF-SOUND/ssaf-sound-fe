import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { fontCss } from '~/styles/utils';

interface QuestionRowProps {
  children: ReactNode;
}

const QuestionRow = (props: QuestionRowProps) => {
  return <p css={selfCss} {...props} />;
};

const selfCss = css(fontCss.style.B28);

export default QuestionRow;
