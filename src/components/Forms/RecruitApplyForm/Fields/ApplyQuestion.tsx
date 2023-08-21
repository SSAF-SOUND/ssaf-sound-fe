import type { ComponentPropsWithoutRef } from 'react';

import { css } from '@emotion/react';

import { fontCss } from '~/styles/utils';

export interface QuestionProps {
  order?: number;
  question?: string;
}

export interface ApplyQuestionProps extends ComponentPropsWithoutRef<'p'> {
  order?: QuestionProps['order'];
  question?: QuestionProps['question'];
}

export const ApplyQuestion = (props: ApplyQuestionProps) => {
  const { order = 1, question = 'test', ...restProps } = props;
  return (
    <p css={selfCss} {...restProps}>
      {order}. {question}
    </p>
  );
};

const selfCss = css(fontCss.family.auto, fontCss.style.B16, {
  wordBreak: 'keep-all',
});
