import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { flex, fontCss } from '~/styles/utils';

interface QuestionRootProps {
  children: ReactNode;
}

const QuestionRoot = (props: QuestionRootProps) => {
  return <div css={selfCss} {...props} />;
};

const selfCss = css(flex('', '', 'column', 10), fontCss.family.auto);

export default QuestionRoot;
