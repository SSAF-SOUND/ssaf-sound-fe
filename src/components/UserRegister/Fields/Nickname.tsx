import { css } from '@emotion/react';

import { Button } from '~/components/Common';
import Question from '~/components/UserRegister/Question';
import { fontCss } from '~/styles/utils';

const Nickname = () => {
  return (
    <div css={selfCss}>
      <Question>
        <Question.Row>닉네임을</Question.Row>
        <Question.Row>설정해주세요</Question.Row>
      </Question>

      <div css={inputContainerCss}>
        <input type="text" css={inputCss} />
        <p css={inputAlertCss}>익명성을 해치는 닉네임을 피해주세요</p>
      </div>

      <Button css={buttonCss} variant="filled">
        확인
      </Button>
    </div>
  );
};

const selfCss = css({
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
});

const inputContainerCss = css({
  flexGrow: 1,
  marginTop: 40,
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
});

const inputCss = css({
  width: '100%',
  height: 50,
  borderRadius: 8,
  border: '1px solid #777777',
  padding: '0 20px',
  fontSize: 18,
});

const inputAlertCss = css(fontCss.family.sans, {
  color: '#61A3F3',
  fontSize: 16,
});

const buttonCss = css({
  width: '100%',
});

export default Nickname;
