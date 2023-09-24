import { css } from '@emotion/react';
import { isBoolean } from 'is-what';

import { Button, SsafyIcon } from '~/components/Common';
import { TrackSize } from '~/components/Common/SsafyIcon/Track';
import {
  useUserRegisterFormContext,
  UserRegisterFormFieldQuestion,
} from '~/components/Forms/UserRegisterForm/utils';
import { flex } from '~/styles/utils';

const fieldName = 'ssafyMember';
const fieldQuestion = '안녕하세요\nSSAFY인 이신가요?';

export interface IsMemberProps {
  onTrue: () => void;
  onFalse: () => void;
}

export const IsMember = (props: IsMemberProps) => {
  const { onTrue, onFalse } = props;
  const { register, setValue } = useUserRegisterFormContext();
  const handleTrue = () => {
    setValue(fieldName, true);
    onTrue();
  };
  const handleFalse = () => {
    setValue(fieldName, false);
    onFalse();
  };

  register(fieldName, {
    validate: (value) => isBoolean(value),
  });

  return (
    <>
      <UserRegisterFormFieldQuestion>
        {fieldQuestion}
      </UserRegisterFormFieldQuestion>

      <SsafyIcon.Track size={TrackSize.LG2} />

      <div css={buttonGroupCss}>
        <Button size="lg" variant="filled" css={buttonCss} onClick={handleTrue}>
          네
        </Button>
        <Button
          size="lg"
          variant="inverse"
          css={buttonCss}
          onClick={handleFalse}
        >
          아니오
        </Button>
      </div>
    </>
  );
};

const buttonGroupCss = css(
  {
    width: '100%',
  },
  flex('', '', 'row', 20)
);

const buttonCss = css({
  width: '100%',
});
