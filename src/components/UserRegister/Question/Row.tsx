import type { ReactNode } from 'react';

import { css } from '@emotion/react';

interface QuestionRowProps {
  children: ReactNode;
}

const QuestionRow = (props: QuestionRowProps) => {
  return <p css={selfCss} {...props} />;
};

const selfCss = css({
  fontSize: 30,
});

export default QuestionRow;
