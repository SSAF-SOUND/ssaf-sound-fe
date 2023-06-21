import { css } from '@emotion/react';
import { useId } from 'react';

import { Button, Icon, IconButton } from '~/components/Common';
import AlertText from '~/components/Common/AlertText';
import TextInput from '~/components/Common/TextInput';
import Question from '~/components/UserRegister/Question';
import { flex } from '~/styles/utils';

const Nickname = () => {
  const nicknameFieldId = useId();

  return (
    <div css={selfCss}>
      <label htmlFor={nicknameFieldId}>
        <Question>
          <Question.Row>닉네임을</Question.Row>
          <Question.Row>입력해주세요</Question.Row>
        </Question>
      </label>

      <div css={inputContainerCss}>
        <div css={refreshNicknameCss}>
          <p>랜덤 닉네임 생성</p>
          <IconButton size={32}>
            <Icon name="refresh" size={28} />
          </IconButton>
        </div>
        <TextInput
          placeholder="James"
          size="lg"
          type="text"
          id={nicknameFieldId}
        />
        <AlertText>닉네임이 중복됩니다.</AlertText>
      </div>

      <Button css={buttonCss} variant="filled" size="lg">
        확인
      </Button>
    </div>
  );
};

const selfCss = css(
  {
    height: '100%',
  },
  flex()
);

const inputContainerCss = css(
  {
    flexGrow: 1,
    marginTop: 40,
  },
  flex('', '', 'column', 10)
);

const buttonCss = css({
  width: '100%',
});

const refreshNicknameCss = css(flex('center', 'flex-end', 'row', 8));

export default Nickname;
