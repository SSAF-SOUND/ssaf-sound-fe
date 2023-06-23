import { css } from '@emotion/react';

import { SelectBox } from '~/components/Common';
import { useSetPhaseContext } from '~/components/UserRegister/context';
import Question from '~/components/UserRegister/Question';
import { flex } from '~/styles/utils';

const years = Array(10)
  .fill(undefined)
  .map((_, i) => `${i + 1}기`);

const Year = () => {
  const setPhase = useSetPhaseContext();
  const handleValueChange = () => setPhase((p) => p + 1);

  return (
    <label css={selfCss}>
      <Question>
        <Question.Row>SSAFY</Question.Row>
        <Question.Row>기수를 선택해주세요</Question.Row>
      </Question>

      <SelectBox
        id="id"
        items={years}
        onValueChange={handleValueChange}
        size="lg"
      />
    </label>
  );
};

const selfCss = css(flex('', '', 'column', 40));

export default Year;
