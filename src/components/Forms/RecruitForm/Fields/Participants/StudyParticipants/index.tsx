import type {
  RecruitParticipants,
  RecruitFormValues,
} from '~/components/Forms/RecruitForm/utils';

import { css } from '@emotion/react';
import { useWatch } from 'react-hook-form';

import { NumberInput } from '~/components/Common';
import FieldOverview from '~/components/Forms/RecruitForm/Common/FieldOverview';
import {
  maxParticipantsCount,
  minParticipantsCount,
  RecruitCategoryName,
  useRecruitFormContext,
} from '~/components/Forms/RecruitForm/utils';
import { createBoundClamp } from '~/utils';

const fieldArrayName = 'participants.study';
const participantsFieldName = `${fieldArrayName}.0` as const;
const clamp = createBoundClamp([minParticipantsCount, maxParticipantsCount]);

interface StudyParticipantsProps {
  className?: string;
}

const validateStudyParticipants = (
  { count }: RecruitParticipants,
  formValues: RecruitFormValues
) => {
  if (formValues.category !== RecruitCategoryName.STUDY) {
    return true;
  }

  if (count < minParticipantsCount || count > maxParticipantsCount) {
    return `모집 인원은 ${minParticipantsCount}명 ~ ${maxParticipantsCount}명 사이만 가능합니다.`;
  }

  return true;
};

const StudyParticipants = (props: StudyParticipantsProps) => {
  const { className } = props;
  const { register, setValue } = useRecruitFormContext();
  const participants = useWatch<RecruitFormValues>({
    name: participantsFieldName,
  }) as RecruitParticipants;
  const { count } = participants;

  const countFieldName = `${fieldArrayName}.0.count` as const;

  const handleChangeCount = (amount: number) => () => {
    setValue(countFieldName, clamp(count + amount), {
      shouldDirty: true,
    });
  };

  register(participantsFieldName, {
    validate: validateStudyParticipants,
  });

  return (
    <div className={className}>
      <FieldOverview>모집 인원</FieldOverview>

      <NumberInput
        css={numberInputCss}
        min={minParticipantsCount}
        max={maxParticipantsCount}
        onClickMinus={handleChangeCount(-1)}
        onClickPlus={handleChangeCount(1)}
        {...register(countFieldName, {
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
