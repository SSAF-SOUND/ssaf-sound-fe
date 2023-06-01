import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { fontCss } from '~/styles/utils';

interface QuestionRootProps {
  children: ReactNode;
}

const QuestionRoot = (props: QuestionRootProps) => {
  return <div css={selfCss} {...props} />;
};

const selfCss = css(fontCss.family.sans, {
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  fontWeight: 700,
});

export default QuestionRoot;
