import { css } from '@emotion/react';

import { Button, SsafyIcon } from '~/components/Common';
import { useSetPhaseContext } from '~/components/UserRegister/context';
import Question from '~/components/UserRegister/Question';
import { flex } from '~/styles/utils';

const nicknamePhase = 4;

const IsMember = () => {
  const setPhase = useSetPhaseContext();
  const handleClickYes = () => {
    setPhase((p) => p + 1);
  };
  const handleClickNo = () => {
    setPhase(nicknamePhase);
  };

  return (
    <div css={selfCss}>
      <Question>
        <Question.Row>안녕하세요</Question.Row>
        <Question.Row>SSAFY인 이신가요?</Question.Row>
      </Question>

      <SsafyIcon.Track name="primaryDefault" size={160} />

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
  flex('', 'space-between')
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

export default IsMember;
