import { css } from '@emotion/react';

import { Button } from '~/components/Common';
import { useSetPhaseContext } from '~/components/UserRegister/context';
import Question from '~/components/UserRegister/Question';
import { flex } from '~/styles/utils';

const IsMajor = () => {
  const setPhase = useSetPhaseContext();
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
