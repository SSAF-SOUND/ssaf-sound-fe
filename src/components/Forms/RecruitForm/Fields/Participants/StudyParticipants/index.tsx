import type {
  RecruitParticipants,
  RecruitFormValues,
} from '~/components/Forms/RecruitForm/utils';

import { css } from '@emotion/react';
import { useWatch } from 'react-hook-form';

import { NumberInput } from '~/components/Common';
import FieldOverview from '~/components/Forms/RecruitForm/Common/FieldOverview';
import { useRecruitFormContext } from '~/components/Forms/RecruitForm/utils';
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
  }) as RecruitParticipants;
  const { count } = participants;

  const countFieldName = `${fieldArrayName}.0.count` as const;

  const handleChangeCount = (amount: number) => () => {
    setValue(countFieldName, clamp(count + amount));
  };

  return (
    <div className={className}>
      <FieldOverview>모집 인원</FieldOverview>

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
