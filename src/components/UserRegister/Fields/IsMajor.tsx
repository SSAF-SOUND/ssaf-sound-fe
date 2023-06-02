import { css } from '@emotion/react';

import { Button } from '~/components/Common';
import { useSetPhase } from '~/components/UserRegister/context';
import Question from '~/components/UserRegister/Question';

const IsMajor = () => {
  const setPhase = useSetPhase();
  const handleClickButton = () => {
    setPhase((p) => p + 1);
  };

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
          onClick={handleClickButton}
        >
          네
        </Button>
        <Button
          size="lg"
          variant="outlined"
          css={buttonCss}
          onClick={handleClickButton}
        >
          아니오
        </Button>
      </div>
    </div>
  );
};

const selfCss = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
});

const buttonGroupCss = css({
  display: 'flex',
  width: '100%',
  gap: 20,
});

const buttonCss = css({
  width: '100%',
});

export default IsMajor;
