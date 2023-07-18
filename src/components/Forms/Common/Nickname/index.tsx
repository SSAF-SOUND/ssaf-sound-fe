import { css } from '@emotion/react';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';

import { AlertText, Icon, IconButton, TextInput } from '~/components/Common';
import { createRandomNickname, nicknameValidator } from '~/services/member';
import { flex } from '~/styles/utils';

interface NicknameProps {
  fieldName: string;
  className?: string;
  id?: string;
}

const Nickname = (props: NicknameProps) => {
  const { fieldName, className, id } = props;
  const { register, setFocus, setValue } = useFormContext();

  const handleCreateRandomNickname = () => {
    setValue(fieldName, createRandomNickname(), {
      shouldDirty: true,
    });
    setFocus(fieldName);
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
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault();
        }}
        placeholder="James"
        size="lg"
        type="text"
        autoComplete="off"
        {...register(fieldName, {
          validate: nicknameValidator,
        })}
      />
      <ErrorMessage
        name={fieldName}
        render={({ message }) => <AlertText>{message}</AlertText>}
      />
    </div>
  );
};

Nickname.displayName = 'Nickname';
export default Nickname;

const refreshNicknameCss = css(flex('center', 'flex-end', 'row', 8));
