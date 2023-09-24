import { css } from '@emotion/react';

import { SelectBox } from '~/components/Common/SelectBox';
import {
  useUserRegisterFormContext,
  UserRegisterFormFieldQuestion,
} from '~/components/Forms/UserRegisterForm/utils';
import { useCampuses } from '~/services/meta';
import { flex } from '~/styles/utils';

const fieldName = 'campus';
const fieldQuestion = 'SSAFY\n캠퍼스를 선택해주세요';

export interface CampusProps {
  onSelect: () => void;
}

export const Campus = (props: CampusProps) => {
  const { onSelect } = props;
  const { data: campuses } = useCampuses();

  const { setValue, register } = useUserRegisterFormContext();
  const handleCampusChange = (value: string) => {
    setValue(fieldName, value);
    onSelect();
  };

  register(fieldName);

  return (
    <label css={selfCss}>
      <UserRegisterFormFieldQuestion>
        {fieldQuestion}
      </UserRegisterFormFieldQuestion>

      <SelectBox
        items={campuses}
        textAs={(value) => `${value} 캠퍼스`}
        onValueChange={handleCampusChange}
        size="lg"
        focusOnMount
      />
    </label>
  );
};

const selfCss = css(flex('', '', 'column', 40));
