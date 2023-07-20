import { css } from '@emotion/react';
import { useId } from 'react';

import { flex } from '~/styles/utils';

import Answer from './Answer';
import Question from './Question';

export const Quiz = () => {
  const answerId = useId();

  return (
    <div css={selfCss}>
      <Question />
      <Answer css={answerCss} fieldId={answerId} />
    </div>
  );
};

const selfCss = css({ paddingTop: 32, flexGrow: 1 }, flex());
const answerCss = css(
  {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  flex()
);
