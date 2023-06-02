import { css } from '@emotion/react';

import { SelectBox } from '~/components/Common';
import { useSetPhase } from '~/components/UserRegister/context';
import Question from '~/components/UserRegister/Question';

const campuses = ['서울', '대전', '광주', '구미', '부산'];

const Campus = () => {
  const setPhase = useSetPhase();
  const handleValueChange = () => setPhase((p) => p + 1);

  return (
    <div css={selfCss}>
      <Question>
        <Question.Row>SSAFY</Question.Row>
        <Question.Row>캠퍼스를 선택해주세요</Question.Row>
      </Question>

      <SelectBox items={campuses} onValueChange={handleValueChange} />
    </div>
  );
};

const selfCss = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
});

export default Campus;
