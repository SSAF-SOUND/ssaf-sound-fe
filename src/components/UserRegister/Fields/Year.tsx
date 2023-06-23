import type { UpdateMyInfoParams } from '~/services/member';

import { css } from '@emotion/react';
import { useFormContext } from 'react-hook-form';

import { SelectBox } from '~/components/Common';
import { useSetPhaseContext } from '~/components/UserRegister/context';
import Question from '~/components/UserRegister/Question';
import { flex } from '~/styles/utils';

const years = Array(10)
  .fill(undefined)
  .map((_, i) => `${i + 1}기`);

const fieldName = 'semester';
const filterNumericText = (value: string) => value.replace(/\D/g, '');

const Year = () => {
  const { register, setValue } = useFormContext<UpdateMyInfoParams>();
  const setPhase = useSetPhaseContext();
  const handleValueChange = (value: string) => {
    setPhase((p) => p + 1);
    setValue(fieldName, Number(value));
  };

  register(fieldName);

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
      />
    </label>
  );
};

const selfCss = css(flex('', '', 'column', 40));

export default Year;
