import { css } from '@emotion/react';
import { isBoolean } from 'is-what';

import { Button } from '~/components/Common';
import { useUserRegisterFormContext } from "~/components/UserRegisterForm/utils";
import { flex, fontCss } from '~/styles/utils';

const fieldName = 'isMajor';

interface IsMajorProps {
  onTrue: () => void;
  onFalse: () => void;
}

const IsMajor = (props: IsMajorProps) => {
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
    <div css={selfCss}>
      <p css={fontCss.style.B28}>전공자이신가요?</p>

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
    </div>
  );
};

export default IsMajor;

const selfCss = css(
  {
    height: '100%',
  },
  flex('', 'space-between', 'column')
);

const buttonGroupCss = css(
  {
    width: '100%',
  },
  flex('', '', 'row', 20)
);

const buttonCss = css({
  width: '100%',
});
