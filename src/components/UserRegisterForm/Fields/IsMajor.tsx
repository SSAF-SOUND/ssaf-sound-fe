import { css } from '@emotion/react';

import { Button } from '~/components/Common';
import { useUpdateMyInfoFormContext } from '~/services/member';
import { flex } from '~/styles/utils';

import Question from '../Question';

const fieldName = 'isMajor';

interface IsMajorProps {
  onTrue: () => void;
  onFalse: () => void;
}

const IsMajor = (props: IsMajorProps) => {
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

  register(fieldName);

  return (
    <div css={selfCss}>
      <Question>
        <Question.Row>전공자이신가요?</Question.Row>
      </Question>

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

export default IsMajor;

const selfCss = css(
  {
    height: '100%',
  },
  flex('', 'space-between', 'column')
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
