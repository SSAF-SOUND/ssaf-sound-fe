import { css } from '@emotion/react';
import { useEffect, useId, useRef, useState } from 'react';

import { Button, VisuallyHidden } from '~/components/Common';
import NicknameField from '~/components/Forms/Common/Nickname';
import { useUserRegisterFormContext } from '~/components/Forms/UserRegisterForm/utils';
import { useModal } from '~/components/GlobalModal';
import { useValidateNickname } from '~/services/member';
import { flex, fontCss, palettes } from '~/styles/utils';
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
  const { openModal, closeModal } = useModal();
  const nicknameFieldId = useId();

  const submittable = isValidNickname && !dirtyFields.nickname;
  const isButtonDisabled = !isValidNickname && !dirtyFields.nickname;
  const isButtonLoading = isValidatingNickname || isSubmitting;

  const handleOpenModal = () => {
    openModal('alert', {
      title: '알림',
      description: (
        <p>
          닉네임을{' '}
          <strong style={{ color: palettes.primary.darken }}>
            {getValues(fieldName)}
          </strong>
          (으)로 설정하시겠습니까?
        </p>
      ),
      actionText: '확인',
      cancelText: '취소',
      onClickAction: submitForm,
      onClickCancel: closeModal,
    });
  };

  const handleValidateNickname = async () => {
    const nickname = getValues(fieldName);
    const passClientValidate = await trigger(fieldName);
    if (!passClientValidate) return;

    if (submittable) {
      handleOpenModal();
      return;
    }

    validateNickname(
      { nickname },
      {
        onSuccess: () => {
          setIsValidNickname(true);
          handleOpenModal();
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
