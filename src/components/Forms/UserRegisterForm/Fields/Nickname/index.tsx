import type { UserRegisterFormValues } from '~/components/Forms/UserRegisterForm/utils';

import { css } from '@emotion/react';
import { useEffect, useId, useState } from 'react';
import { useFormState, useWatch } from 'react-hook-form';

import { Button } from '~/components/Common/Button';
import {
  UserRegisterFormFieldQuestion,
  useUserRegisterFormContext,
} from '~/components/Forms/UserRegisterForm/utils';
import { useModal } from '~/components/GlobalModal';
import {
  duplicateNicknameMessage,
  useValidateNickname,
} from '~/services/member';
import { flex } from '~/styles/utils';
import { handleAxiosError } from '~/utils';

import NicknameInput from './NicknameInput';
import { useNicknameReconfirmModal } from './useNicknameReconfirmModal';

const fieldName = 'nickname';
const fieldQuestion = '닉네임을\n입력해주세요';

export interface NicknameProps {
  initialNickname?: string;
  className?: string;
  withLabelText?: boolean;
  buttonText?: string;
  onSubmit?: () => void;
}

export const Nickname = (props: NicknameProps) => {
  const {
    initialNickname = '',
    className,
    withLabelText = true,
    buttonText = '확인',
    onSubmit,
  } = props;
  const [isValidNickname, setIsValidNickname] = useState(false);
  const { mutateAsync: validateNickname, isLoading: isValidatingNickname } =
    useValidateNickname();

  const { setFocus, resetField, trigger, setError } =
    useUserRegisterFormContext();
  const { dirtyFields, isSubmitting } = useFormState<UserRegisterFormValues>({
    name: fieldName,
  });

  const nickname = useWatch({ name: fieldName });
  const nicknameFieldId = useId();

  const { closeModal } = useModal();
  const { openNicknameReconfirmModal } = useNicknameReconfirmModal();
  const submittable =
    isValidNickname && !dirtyFields.nickname && nickname !== initialNickname;
  const isButtonDisabled =
    (!isValidNickname && !dirtyFields.nickname) || nickname === initialNickname;
  const isButtonLoading = isValidatingNickname || isSubmitting;

  const submitForm = () => {
    onSubmit?.();
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

    try {
      const available = await validateNickname({ nickname });
      resetField(fieldName, { defaultValue: nickname });

      if (!available) {
        setError(
          fieldName,
          { message: duplicateNicknameMessage },
          { shouldFocus: true }
        );
        return;
      }

      setIsValidNickname(true);
      handleOpenReconfirmModal(nickname);
    } catch (err) {
      handleAxiosError(err, {
        onClientError: (response) => {
          setIsValidNickname(false);
          resetField(fieldName, { defaultValue: nickname });
          setError(fieldName, {
            message: response.message,
          });
        },
      });
    }
  };

  useEffect(() => {
    resetField(fieldName, { defaultValue: initialNickname });
    setFocus(fieldName);
  }, [initialNickname, resetField, setFocus]);

  return (
    <div css={selfCss} className={className}>
      {withLabelText && (
        <label htmlFor={nicknameFieldId} css={[labelCss, { marginBottom: 40 }]}>
          <UserRegisterFormFieldQuestion>
            {fieldQuestion}
          </UserRegisterFormFieldQuestion>
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
    </div>
  );
};

const buttonCss = css({ width: '100%' });

const selfCss = css({ flexGrow: 1 }, flex());

const labelCss = css({ display: 'block' });
const inputContainerCss = css({ flexGrow: 1 }, flex('', '', 'column', 10));
