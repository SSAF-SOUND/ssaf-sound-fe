import { css } from '@emotion/react';
import { useEffect } from 'react';

import { SelectBox } from '~/components/Common';
import { useUpdateMyInfoFormContext } from '~/services/member';
import { flex } from '~/styles/utils';

import Question from '../Question';

const years = Array(10)
  .fill(undefined)
  .map((_, i) => `${i + 1}기`);

const fieldName = 'semester';
const filterNumericText = (value: string) => value.replace(/\D/g, '');

interface YearProps {
  onSelect: () => void;
}

const Year = (props: YearProps) => {
  const { onSelect } = props;
  const { register, setValue, setFocus } = useUpdateMyInfoFormContext();
  const handleValueChange = (value: string) => {
    setValue(fieldName, Number(value));
    onSelect();
  };
  register(fieldName);

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
