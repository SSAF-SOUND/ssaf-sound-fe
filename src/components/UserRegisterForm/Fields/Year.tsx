import { css } from '@emotion/react';
import { useEffect } from 'react';

import { SelectBox } from '~/components/Common';
import { useUserRegisterFormContext } from '~/components/UserRegisterForm/utils';
import { flex, fontCss } from '~/styles/utils';

const years = Array(10)
  .fill(undefined)
  .map((_, i) => `${i + 1}기`);

const fieldName = 'year';
const filterNumericText = (value: string) => value.replace(/\D/g, '');

interface YearProps {
  onSelect: () => void;
}

const Year = (props: YearProps) => {
  const { onSelect } = props;
  const { register, setValue, setFocus } = useUserRegisterFormContext();
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
      <div css={fontCss.style.B28}>
        <p>SSAFY</p>
        <p>기수를 선택해주세요</p>
      </div>

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
