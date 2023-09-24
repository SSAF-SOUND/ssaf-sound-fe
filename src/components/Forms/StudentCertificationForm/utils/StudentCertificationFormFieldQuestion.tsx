import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { fontCss } from '~/styles/utils';

interface UserRegisterFormFieldQuestionProps {
  children?: ReactNode;
  className?: string;
}

export const StudentCertificationFormFieldQuestion = (
  props: UserRegisterFormFieldQuestionProps
) => {
  return <p css={selfCss} {...props} />;
};

const selfCss = css(fontCss.style.B28, { whiteSpace: 'pre-wrap' });
