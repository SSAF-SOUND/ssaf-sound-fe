import { css } from '@emotion/react';
import { isNumber } from 'is-what';
import { useEffect, useRef } from 'react';

import { SelectBox } from '~/components/Common';
import { useSetPhaseContext } from '~/components/UserRegister/context';
import Question from '~/components/UserRegister/Question';
import { useUpdateMyInfoFormContext } from '~/services/member';
import { flex } from '~/styles/utils';

const years = Array(10)
  .fill(undefined)
  .map((_, i) => `${i + 1}기`);

const fieldName = 'semester';
const filterNumericText = (value: string) => value.replace(/\D/g, '');

const Year = () => {
  const { register, setValue, setFocus } = useUpdateMyInfoFormContext();
  const setPhase = useSetPhaseContext();
  const handleValueChange = (value: string) => {
    setPhase((p) => p + 1);
    setValue(fieldName, Number(value));
  };
  register(fieldName, {
    validate: (value) => isNumber(value),
  });

  useEffect(() => {
    setFocus(fieldName);
  }, [setFocus]);

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
        valueAs={filterNumericText}
        size="lg"
        focusOnMount
      />
    </label>
  );
};

export default Year;

const selfCss = css(flex('', '', 'column', 40));
