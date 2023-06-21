import { css } from '@emotion/react';

import { SelectBox } from '~/components/Common';
import { useSetPhaseContext } from '~/components/UserRegister/context';
import Question from '~/components/UserRegister/Question';
import { flex } from '~/styles/utils';

const campuses = ['서울', '대전', '광주', '구미', '부울경'];

const Campus = () => {
  const setPhase = useSetPhaseContext();
  const handleValueChange = () => setPhase((p) => p + 1);

  return (
    <label css={selfCss}>
      <Question>
        <Question.Row>SSAFY</Question.Row>
        <Question.Row>캠퍼스를 선택해주세요</Question.Row>
      </Question>

      <SelectBox
        items={campuses}
        textAs={(value) => `${value} 캠퍼스`}
        onValueChange={handleValueChange}
        size="lg"
      />
    </label>
  );
};

const selfCss = css(flex('', '', 'column', 40));

export default Campus;
