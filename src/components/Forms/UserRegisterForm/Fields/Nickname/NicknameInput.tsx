import type { KeyboardEventHandler } from 'react';

import { css } from '@emotion/react';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';

import { AlertText, Icon, IconButton, TextInput } from '~/components/Common';
import { createRandomNickname, nicknameValidator } from '~/services/member';
import { flex } from '~/styles/utils';

interface NicknameInputProps {
  fieldName: string;
  initialNickname: string;
  className?: string;
  id?: string;
}

const NicknameInput = (props: NicknameInputProps) => {
  const { fieldName, className, id, initialNickname } = props;
  const { register, setFocus, setValue } = useFormContext();

  const handleCreateRandomNickname = () => {
    setValue(fieldName, createRandomNickname(), {
      shouldDirty: true,
    });
    setFocus(fieldName);
  };

  const preventSubmitOnEnterKeyDown: KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  return (
    <div className={className}>
      <div css={refreshNicknameCss}>
        <p>랜덤 닉네임 생성</p>
        <IconButton size={32} onClick={handleCreateRandomNickname}>
          <Icon name="refresh" size={28} />
        </IconButton>
      </div>
      <TextInput
        id={id}
        onKeyDown={preventSubmitOnEnterKeyDown}
        placeholder="James"
        size="lg"
        type="text"
        autoComplete="off"
        {...register(fieldName, {
          validate: (value) => nicknameValidator(value, initialNickname),
        })}
      />
      <ErrorMessage
        name={fieldName}
        render={({ message }) => <AlertText>{message}</AlertText>}
      />
    </div>
  );
};

NicknameInput.displayName = 'Nickname';
export default NicknameInput;

const refreshNicknameCss = css(flex('center', 'flex-end', 'row', 8));
