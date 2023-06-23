import type { UpdateMyInfoParams } from '~/services/member';

import { css } from '@emotion/react';
import { useFormContext } from 'react-hook-form';

import { Button } from '~/components/Common';
import { useSetPhaseContext } from '~/components/UserRegister/context';
import Question from '~/components/UserRegister/Question';
import { flex } from '~/styles/utils';

const fieldName = 'isMajor';

const IsMajor = () => {
  const setPhase = useSetPhaseContext();
  const { register, setValue } = useFormContext<UpdateMyInfoParams>();

  const handleClickYes = () => {
    setValue(fieldName, true);
    setPhase((p) => p + 1);
  };

  const handleClickNo = () => {
    setValue(fieldName, false);
    setPhase((p) => p + 1);
  };

  register(fieldName);

  return (
    <div css={selfCss}>
      <Question>
        <Question.Row>전공자이신가요?</Question.Row>
      </Question>

      <div css={buttonGroupCss}>
        <Button
          size="lg"
          variant="filled"
          css={buttonCss}
          onClick={handleClickYes}
        >
          네
        </Button>
        <Button
          size="lg"
          variant="outlined"
          css={buttonCss}
          onClick={handleClickNo}
        >
          아니오
        </Button>
      </div>
    </div>
  );
};

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

export default IsMajor;
