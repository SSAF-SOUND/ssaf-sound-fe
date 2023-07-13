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
import { useUserRegisterFormContext } from '~/components/UserRegisterForm/utils';
import {
  createRandomNickname,
  nicknameValidator,
  useValidateNickname,
} from '~/services/member';
import { flex, fontCss, palettes } from '~/styles/utils';
import { handleAxiosError } from '~/utils';

const fieldName = 'nickname';

const Nickname = () => {
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
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
    setError,
    formState: { errors, dirtyFields, isSubmitting },
  } = useUserRegisterFormContext();
  const nicknameFieldId = useId();
  const errorMessage = errors.nickname?.message;
  const submittable = isValidNickname && !dirtyFields.nickname;
  const isButtonDisabled = !isValidNickname && !dirtyFields.nickname;
  const isButtonLoading = isValidatingNickname || isSubmitting;

  const closeSubmitModal = () => setSubmitModalOpen(false);
  const openSubmitModal = () => setSubmitModalOpen(true);

  const handleCreateRandomNickname = () => {
    setValue(fieldName, createRandomNickname(), {
      shouldDirty: true,
    });
    setFocus(fieldName);
  };

  const handleValidateNickname = async () => {
    const nickname = getValues(fieldName);
    const passClientValidate = await trigger(fieldName);
    if (!passClientValidate) return;

    if (submittable) {
      openSubmitModal();
      return;
    }

    validateNickname(
      { nickname },
      {
        onSuccess: () => {
          setIsValidNickname(true);
          openSubmitModal();
          resetField(fieldName, { defaultValue: nickname });
        },
        onError: (error) => {
          handleAxiosError(error, {
            onClientError: (response) => {
              setIsValidNickname(false);
              resetField(fieldName, { defaultValue: nickname });
              setError(fieldName, {
                message: response.message,
              });
            },
          });
        },
      }
    );
  };

  const triggerSubmit = () => {
    submitButtonRef.current?.click();
    closeSubmitModal();
  };

  useEffect(() => {
    resetField(fieldName, { defaultValue: '' });
    setFocus(fieldName);
  }, [resetField, setFocus]);

  return (
    <div css={selfCss}>
      <label htmlFor={nicknameFieldId}>
        <div css={fontCss.style.B28}>
          <p>닉네임을</p>
          <p>입력해주세요</p>
        </div>
      </label>

      <div css={inputContainerCss}>
        <div css={refreshNicknameCss}>
          <p>랜덤 닉네임 생성</p>
          <IconButton size={32} onClick={handleCreateRandomNickname}>
            <Icon name="refresh" size={28} />
          </IconButton>
        </div>
        <TextInput
          onKeyDown={(e) => {
            // Enter Key를 통한 Submit 방지
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
          placeholder="James"
          size="lg"
          type="text"
          autoComplete="off"
          id={nicknameFieldId}
          {...register(fieldName, {
            validate: nicknameValidator,
          })}
        />
        {errorMessage && <AlertText>{errorMessage}</AlertText>}
      </div>

      <Button
        type="button"
        css={buttonCss}
        size="lg"
        onClick={handleValidateNickname}
        loading={isButtonLoading}
        disabled={isButtonDisabled}
      >
        확인
      </Button>

      {submittable && (
        <>
          <Modal
            open={submitModalOpen}
            onEscapeKeyDown={closeSubmitModal}
            onPointerDownOutside={closeSubmitModal}
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
                onClickAction={triggerSubmit}
                onClickCancel={closeSubmitModal}
              />
            }
          />

          <VisuallyHidden>
            <button type="submit" ref={submitButtonRef} aria-hidden />
          </VisuallyHidden>
        </>
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
