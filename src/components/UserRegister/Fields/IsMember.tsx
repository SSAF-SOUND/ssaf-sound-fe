import type { UpdateMyInfoParams } from '~/services/member';

import { css } from '@emotion/react';
import { useFormContext } from 'react-hook-form';

import { Button, SsafyIcon } from '~/components/Common';
import { useSetPhaseContext } from '~/components/UserRegister/context';
import Question from '~/components/UserRegister/Question';
import { flex } from '~/styles/utils';

const nicknamePhase = 4;
const fieldName = 'ssafyMember';

const IsMember = () => {
  const { register, setValue } = useFormContext<UpdateMyInfoParams>();
  const setPhase = useSetPhaseContext();
  const handleClickYes = () => {
    setValue(fieldName, true);
    setPhase((p) => {
      console.log('phase', p);
      return p + 1;
    });
  };
  const handleClickNo = () => {
    setValue(fieldName, false);
    setPhase(nicknamePhase);
  };

  register(fieldName, {
    required: true,
  });

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
