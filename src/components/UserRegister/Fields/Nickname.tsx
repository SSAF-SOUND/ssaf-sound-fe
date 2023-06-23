import type { UpdateMyInfoParams } from '~/services/member';

import { css } from '@emotion/react';
import { useEffect, useId } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  Button,
  Icon,
  IconButton,
  AlertText,
  TextInput,
} from '~/components/Common';
import Question from '~/components/UserRegister/Question';
import { createRandomNickname } from '~/services/member';
import { flex } from '~/styles/utils';

const fieldName = 'nickname';

const Nickname = () => {
  const {
    register,
    setValue,
    setFocus,
    formState: { errors },
  } = useFormContext<UpdateMyInfoParams>();
  const nicknameFieldId = useId();
  const errorMessage = errors.nickname?.message;
  const setRandomNicknameAndFocusField = () => {
    setValue(fieldName, createRandomNickname());
    setFocus(fieldName);
  };

  useEffect(() => {
    setRandomNicknameAndFocusField();
    // eslint-disable-next-line
  }, []);

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
          <IconButton size={32} onClick={setRandomNicknameAndFocusField}>
            <Icon name="refresh" size={28} />
          </IconButton>
        </div>
        <TextInput
          placeholder="James"
          size="lg"
          type="text"
          id={nicknameFieldId}
          {...register(fieldName, {
            required: true,
            validate: (value) =>
              (value.length >= 1 && value.length <= 11) ||
              '닉네임의 길이는 1 ~ 11 사이여야 합니다.',
          })}
        />
        {errorMessage && <AlertText>{errorMessage}</AlertText>}
      </div>

      <Button type="submit" css={buttonCss} variant="filled" size="lg">
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
