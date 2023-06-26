import { css } from '@emotion/react';
import { useEffect, useId, useRef, useState } from 'react';

import {
  Icon,
  IconButton,
  AlertText,
  TextInput,
  Button,
  Modal,
  VisuallyHidden,
} from '~/components/Common';
import { Alert } from '~/components/ModalContent';
import Question from '~/components/UserRegister/Question';
import {
  createRandomNickname,
  useUpdateMyInfoFormContext,
  useValidateNickname,
} from '~/services/member';
import { flex, fontCss, palettes } from '~/styles/utils';

const fieldName = 'nickname';
const isValidLength = (value: string) => {
  const { length } = value;
  return 1 <= length && length <= 11;
};

const isValidWhiteSpace = (value: string) => {
  return !/(^\s|\s$|\s{2,})/.test(value);
};

const isValidFormat = (value: string) => {
  return !/[^\w 가-힣]/.test(value);
};

const Nickname = () => {
  const [isValidNickname, setIsValidNickname] = useState(false);
  const { mutate: validateNickname, isLoading: isValidatingNickname } =
    useValidateNickname();
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    setValue,
    setFocus,
    resetField,
    getValues,
    trigger,
    formState: { errors, dirtyFields },
  } = useUpdateMyInfoFormContext();
  const nicknameFieldId = useId();
  const errorMessage = errors.nickname?.message;
  const submittable = isValidNickname && !dirtyFields.nickname;

  const handleCreateRandomNickname = () => {
    setValue(fieldName, createRandomNickname(), {
      shouldDirty: true,
    });
    setFocus(fieldName);
  };

  const handleValidateNickname = async () => {
    const nickname = getValues(fieldName);
    const isValidNickname = await trigger(fieldName);
    if (!isValidNickname) {
      return;
    }

    validateNickname(
      { nickname },
      {
        onSuccess: () => {
          setIsValidNickname(true);
        },
        onError: () => {
          setIsValidNickname(false);
        },
        onSettled: () => {
          resetField(fieldName, { defaultValue: nickname });
        },
      }
    );
  };

  useEffect(() => {
    resetField(fieldName, { defaultValue: '' });
    setFocus(fieldName);
  }, [resetField, setFocus]);

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
          <IconButton size={32} onClick={handleCreateRandomNickname}>
            <Icon name="refresh" size={28} />
          </IconButton>
        </div>
        <TextInput
          placeholder="James"
          size="lg"
          type="text"
          autoComplete="off"
          id={nicknameFieldId}
          {...register(fieldName, {
            validate: (value) => {
              if (!isValidLength(value)) {
                return '길이는 1 ~ 11 사이여야 합니다.';
              }

              if (!isValidWhiteSpace(value)) {
                return '공백문자를 연달아 사용하거나, 처음과 마지막에 사용할 수 없습니다.';
              }

              return isValidFormat(value) || '한글, 영문, 숫자, _, 공백만 사용할 수 있습니다.';
            },
          })}
        />
        {errorMessage && <AlertText>{errorMessage}</AlertText>}
        {submittable && (
          <p css={[{ color: palettes.success.default }, fontCss.style.R14]}>
            사용 가능한 닉네임입니다.
          </p>
        )}
      </div>

      {submittable ? (
        <>
          <Modal
            trigger={
              <Button css={buttonCss} size="lg">
                확인
              </Button>
            }
            content={
              <Alert
                title="알림"
                description={
                  <p>
                    닉네임을{' '}
                    <strong style={{ color: palettes.primary.darken }}>
                      {getValues(fieldName)}
                    </strong>
                    (으)로 설정하시겠습니까?
                  </p>
                }
                actionText="확인"
                cancelText="취소"
                onClickAction={() => {
                  submitButtonRef.current?.click();
                }}
              />
            }
          />
          <VisuallyHidden>
            <button type="submit" ref={submitButtonRef} />
          </VisuallyHidden>
        </>
      ) : (
        <Button
          type="button"
          css={buttonCss}
          size="lg"
          onClick={handleValidateNickname}
          loading={isValidatingNickname}
          disabled={!dirtyFields.nickname}
        >
          닉네임 검사
        </Button>
      )}
    </div>
  );
};

export default Nickname;

const buttonCss = css({ width: '100%' });

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

const refreshNicknameCss = css(flex('center', 'flex-end', 'row', 8));
