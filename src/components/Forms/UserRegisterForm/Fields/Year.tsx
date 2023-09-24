import { css } from '@emotion/react';

import { SelectBox } from '~/components/Common/SelectBox';
import {
  useUserRegisterFormContext,
  UserRegisterFormFieldQuestion,
} from '~/components/Forms/UserRegisterForm/utils';
import { extractNumericText } from '~/services/member';
import { useYears } from '~/services/meta';
import { flex } from '~/styles/utils';

const fieldName = 'year';
const fieldQuestion = 'SSAFY\n기수를 선택해주세요';

export interface YearProps {
  onSelect: () => void;
}

export const Year = (props: YearProps) => {
  const { onSelect } = props;
  const { data: years } = useYears();
  const yearsItem = years.map((year) => `${year}기`);

  const { register, setValue } = useUserRegisterFormContext();
  const handleYearChange = (value: string) => {
    setValue(fieldName, Number(value));
    onSelect();
  };

  register(fieldName);

  return (
    <label css={selfCss}>
      <UserRegisterFormFieldQuestion>
        {fieldQuestion}
      </UserRegisterFormFieldQuestion>

      <SelectBox
        size="lg"
        items={yearsItem}
        valueAs={extractNumericText}
        onValueChange={handleYearChange}
        focusOnMount
      />
    </label>
  );
};

const selfCss = css(flex('', '', 'column', 40));
