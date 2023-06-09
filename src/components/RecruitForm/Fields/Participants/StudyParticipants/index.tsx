import type {
  Participants,
  RecruitFormValues,
} from '~/components/RecruitForm/utils';

import { css } from '@emotion/react';
import { useWatch } from 'react-hook-form';

import { NumberInput } from '~/components/Common';
import { useRecruitFormContext } from '~/components/RecruitForm/utils';
import { createBoundClamp } from '~/utils';

const minCount = 1;
const maxCount = 20;
const fieldArrayName = 'participants.study';
const clamp = createBoundClamp([minCount, maxCount]);

const validateParticipantsCount = (value: number) => {
  if (value > 20 || value < 1)
    return '모집 인원은 1명 ~ 20명 사이만 가능합니다.';
};

interface StudyParticipantsProps {
  className?: string;
}

const StudyParticipants = (props: StudyParticipantsProps) => {
  const { className } = props;
  const { register, setValue } = useRecruitFormContext();
  const participants = useWatch<RecruitFormValues>({
    name: `${fieldArrayName}.0`,
  }) as Participants;
  const { count } = participants;

  const countFieldName = `${fieldArrayName}.0.count` as const;

  const handleChangeCount = (amount: number) => () => {
    setValue(countFieldName, clamp(count + amount));
  };

  return (
    <div className={className}>
      <NumberInput
        css={numberInputCss}
        min={minCount}
        max={maxCount}
        onClickMinus={handleChangeCount(-1)}
        onClickPlus={handleChangeCount(1)}
        {...register(countFieldName, {
          validate: validateParticipantsCount,
          valueAsNumber: true,
        })}
      />
    </div>
  );
};

export default StudyParticipants;

const numberInputCss = css({
  width: '100%',
});
