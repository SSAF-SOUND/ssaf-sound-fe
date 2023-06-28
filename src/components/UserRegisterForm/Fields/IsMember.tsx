import { css } from '@emotion/react';
import { isBoolean } from 'is-what';

import { Button, SsafyIcon } from '~/components/Common';
import { useUpdateMyInfoFormContext } from '~/services/member';
import { flex } from '~/styles/utils';

import Question from '../Question';

const fieldName = 'ssafyMember';

interface IsMemberProps {
  onTrue: () => void;
  onFalse: () => void;
}

const IsMember = (props: IsMemberProps) => {
  const { onTrue, onFalse } = props;
  const { register, setValue } = useUpdateMyInfoFormContext();
  const handleClickYes = () => {
    setValue(fieldName, true);
    onTrue();
  };
  const handleClickNo = () => {
    setValue(fieldName, false);
    onFalse();
  };

  register(fieldName, {
    validate: (value) => isBoolean(value),
  });

  return (
    <div css={selfCss}>
      <Question>
        <Question.Row>안녕하세요</Question.Row>
        <Question.Row>SSAFY인 이신가요?</Question.Row>
      </Question>

      <SsafyIcon.Track name="primaryDefault" size={160} />

      <div css={buttonGroupCss}>
        <Button
          size="lg"
          variant="filled"
          css={buttonCss}
          onClick={handleClickYes}
        >
          네
        </Button>
        <Button
          size="lg"
          variant="outlined"
          css={buttonCss}
          onClick={handleClickNo}
        >
          아니오
        </Button>
      </div>
    </div>
  );
};

export default IsMember;

const selfCss = css(
  {
    height: '100%',
  },
  flex('', 'space-between')
);

const buttonGroupCss = css(
  {
    width: '100%',
  },
  flex('', '', 'row', 20)
);

const buttonCss = css({
  width: '100%',
});
