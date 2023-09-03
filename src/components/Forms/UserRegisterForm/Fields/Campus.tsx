import { css } from '@emotion/react';

import { SelectBox } from '~/components/Common/SelectBox';
import { useUserRegisterFormContext } from '~/components/Forms/UserRegisterForm/utils';
import { flex, fontCss } from '~/styles/utils';

const campuses = ['서울', '대전', '광주', '구미', '부울경'];

const fieldName = 'campus';

interface CampusProps {
  onSelect: () => void;
}

const Campus = (props: CampusProps) => {
  const { onSelect } = props;
  const { setValue, register } = useUserRegisterFormContext();
  const handleValueChange = (value: string) => {
    setValue(fieldName, value);
    onSelect();
  };

  register(fieldName);

  return (
    <label css={selfCss}>
      <div css={fontCss.style.B28}>
        <p>SSAFY</p>
        <p>캠퍼스를 선택해주세요</p>
      </div>

      <SelectBox
        items={campuses}
        textAs={(value) => `${value} 캠퍼스`}
        onValueChange={handleValueChange}
        size="lg"
        focusOnMount
      />
    </label>
  );
};

const selfCss = css(flex('', '', 'column', 40));

export default Campus;
