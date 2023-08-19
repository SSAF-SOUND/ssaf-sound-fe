import type { ComponentPropsWithoutRef } from 'react';

import { css } from '@emotion/react';

import { fontCss } from '~/styles/utils';

interface ApplyQuestionProps extends ComponentPropsWithoutRef<'p'> {
  order?: number;
  question?: string;
}

export const ApplyQuestion = (props: ApplyQuestionProps) => {
  const {
    order = 1,
    question = '리쿠르팅 등록자에게 프로필이 공개됩니다. 이에 동의하십니까?',
  } = props;
  return (
    <p css={selfCss}>
      {order}. {question}
    </p>
  );
};

const selfCss = css(fontCss.family.auto, fontCss.style.B16, {
  wordBreak: 'keep-all',
});
