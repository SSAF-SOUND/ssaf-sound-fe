import { css } from '@emotion/react';
import { isBoolean } from 'is-what';

import { Button, SsafyIcon, TrackSize } from '~/components/Common';
import { useUserRegisterFormContext } from '~/components/Forms/UserRegisterForm/utils';
import { flex, fontCss } from '~/styles/utils';

const fieldName = 'ssafyMember';

interface IsMemberProps {
  onTrue: () => void;
  onFalse: () => void;
}

const IsMember = (props: IsMemberProps) => {
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
      <div css={fontCss.style.B28}>
        <p>안녕하세요</p>
        <p>SSAFY인 이신가요?</p>
      </div>

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

export default IsMember;

const buttonGroupCss = css(
  {
    width: '100%',
  },
  flex('', '', 'row', 20)
);

const buttonCss = css({
  width: '100%',
});
