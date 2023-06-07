import { css } from '@emotion/react';

import { SelectBox } from '~/components/Common';
import { useSetPhaseContext } from '~/components/UserRegister/context';
import Question from '~/components/UserRegister/Question';

const years = Array(10)
  .fill(undefined)
  .map((_, i) => `${i + 1}기`);

const Year = () => {
  const setPhase = useSetPhaseContext();
  const handleValueChange = () => setPhase((p) => p + 1);

  return (
    <div css={selfCss}>
      <Question>
        <Question.Row>SSAFY</Question.Row>
        <Question.Row>기수를 선택해주세요</Question.Row>
      </Question>

      <SelectBox items={years} onValueChange={handleValueChange} />
    </div>
  );
};

const selfCss = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
});

export default Year;
