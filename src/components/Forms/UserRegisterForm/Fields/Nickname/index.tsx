import { css } from '@emotion/react';
import { useEffect, useId, useRef, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { Button, VisuallyHidden } from '~/components/Common';
import { useUserRegisterFormContext } from '~/components/Forms/UserRegisterForm/utils';
import { useModal } from '~/components/GlobalModal';
import { useValidateNickname } from '~/services/member';
import { flex, fontCss } from '~/styles/utils';
import { handleAxiosError } from '~/utils';

import NicknameInput from './NicknameInput';
import { useNicknameReconfirmModal } from './useNicknameReconfirmModal';

const fieldName = 'nickname';

interface NicknameProps {
  initialNickname?: string;
  className?: string;
  withLabelText?: boolean;
  buttonText?: string;
}

const Nickname = (props: NicknameProps) => {
  const {
    initialNickname = '',
    className,
    withLabelText = true,
    buttonText = '확인',
  } = props;
  const [isValidNickname, setIsValidNickname] = useState(false);
  const { mutate: validateNickname, isLoading: isValidatingNickname } =
    useValidateNickname();
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const {
    setFocus,
    resetField,
    trigger,
    setError,
    formState: { dirtyFields, isSubmitting },
  } = useUserRegisterFormContext();
  const nickname = useWatch({ name: fieldName });
  const { closeModal } = useModal();
  const nicknameFieldId = useId();
  const { openNicknameReconfirmModal } = useNicknameReconfirmModal();
  const submittable =
    isValidNickname && !dirtyFields.nickname && nickname !== initialNickname;
  const isButtonDisabled =
    (!isValidNickname && !dirtyFields.nickname) || nickname === initialNickname;
  const isButtonLoading = isValidatingNickname || isSubmitting;

  const submitForm = () => {
    submitButtonRef.current?.click();
    closeModal();
  };

  const handleOpenReconfirmModal = (nickname: string) => {
    openNicknameReconfirmModal({
      nickname,
      onClickAction: submitForm,
    });
  };

  const handleValidateNickname = async () => {
    const passClientValidation = await trigger(fieldName);
    if (!passClientValidation) return;

    if (submittable) {
      handleOpenReconfirmModal(nickname);
      return;
    }

    validateNickname(
      { nickname },
      {
        onSuccess: () => {
          setIsValidNickname(true);
          handleOpenReconfirmModal(nickname);
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

  useEffect(() => {
    resetField(fieldName, { defaultValue: initialNickname });
    setFocus(fieldName);
  }, [initialNickname, resetField, setFocus]);

  return (
    <div css={selfCss} className={className}>
      {withLabelText && (
        <label htmlFor={nicknameFieldId} css={[labelCss, { marginBottom: 40 }]}>
          <div css={fontCss.style.B28}>
            <p>닉네임을</p>
            <p>입력해주세요</p>
          </div>
        </label>
      )}

      <NicknameInput
        id={nicknameFieldId}
        initialNickname={initialNickname}
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
        {buttonText}
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

const labelCss = css({ display: 'block' });
const inputContainerCss = css({ flexGrow: 1 }, flex('', '', 'column', 10));
