import { css } from '@emotion/react';
import { useEffect, useId, useRef, useState } from 'react';

import { Button, VisuallyHidden } from '~/components/Common';
import NicknameField from '~/components/Forms/Common/Nickname';
import { useNicknameReconfirmModal } from '~/components/Forms/Common/Nickname/utils';
import { useUserRegisterFormContext } from '~/components/Forms/UserRegisterForm/utils';
import { useModal } from '~/components/GlobalModal';
import { useValidateNickname } from '~/services/member';
import { flex, fontCss } from '~/styles/utils';
import { handleAxiosError } from '~/utils';

const fieldName = 'nickname';

const Nickname = () => {
  const [isValidNickname, setIsValidNickname] = useState(false);
  const { mutate: validateNickname, isLoading: isValidatingNickname } =
    useValidateNickname();
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const {
    setFocus,
    resetField,
    getValues,
    trigger,
    setError,
    formState: { dirtyFields, isSubmitting },
  } = useUserRegisterFormContext();
  const { closeModal } = useModal();
  const nicknameFieldId = useId();
  const { openNicknameReconfirmModal } = useNicknameReconfirmModal();
  const submittable = isValidNickname && !dirtyFields.nickname;
  const isButtonDisabled = !isValidNickname && !dirtyFields.nickname;
  const isButtonLoading = isValidatingNickname || isSubmitting;

  const handleOpenReconfirmModal = () => {
    openNicknameReconfirmModal({
      nickname: getValues(fieldName),
      onClickAction: submitForm,
    });
  };

  const handleValidateNickname = async () => {
    const nickname = getValues(fieldName);
    const passClientValidation = await trigger(fieldName);
    if (!passClientValidation) return;

    if (submittable) {
      handleOpenReconfirmModal();
      return;
    }

    validateNickname(
      { nickname },
      {
        onSuccess: () => {
          setIsValidNickname(true);
          handleOpenReconfirmModal();
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

  const submitForm = () => {
    submitButtonRef.current?.click();
    closeModal();
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

      <NicknameField
        id={nicknameFieldId}
        css={inputContainerCss}
        fieldName={fieldName}
      />

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
        <VisuallyHidden>
          <button type="submit" ref={submitButtonRef} aria-hidden />
        </VisuallyHidden>
      )}
    </div>
  );
};

export default Nickname;

const buttonCss = css({ width: '100%' });

const selfCss = css({ flexGrow: 1 }, flex());

const inputContainerCss = css(
  {
    flexGrow: 1,
    marginTop: 40,
  },
  flex('', '', 'column', 10)
);
