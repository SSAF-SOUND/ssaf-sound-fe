import { css } from '@emotion/react';
import { isBoolean } from 'is-what';

import { Button } from '~/components/Common';
import {
  UserRegisterFormFieldQuestion,
  useUserRegisterFormContext,
} from '~/components/Forms/UserRegisterForm/utils';
import { flex } from '~/styles/utils';

const fieldName = 'isMajor';
const fieldQuestion = '전공자이신가요?';

interface IsMajorProps {
  onTrue: () => void;
  onFalse: () => void;
}

export const IsMajor = (props: IsMajorProps) => {
  const { onTrue, onFalse } = props;
  const { register, setValue } = useUserRegisterFormContext();

  const handleTrue = () => {
    setValue(fieldName, true);
    onTrue();
  };

  const handleFalse = () => {
    setValue(fieldName, false);
    onFalse();
  };

  register(fieldName, {
    validate: (value) => isBoolean(value),
  });

  return (
    <>
      <UserRegisterFormFieldQuestion>
        {fieldQuestion}
      </UserRegisterFormFieldQuestion>

      <div css={buttonGroupCss}>
        <Button size="lg" variant="filled" css={buttonCss} onClick={handleTrue}>
          네
        </Button>
        <Button
          size="lg"
          variant="inverse"
          css={buttonCss}
          onClick={handleFalse}
        >
          아니오
        </Button>
      </div>
    </>
  );
};

const buttonGroupCss = css({ width: '100%' }, flex('', '', 'row', 20));

const buttonCss = css({ width: '100%' });
