import type {
  RecruitParticipants,
  RecruitFormValues,
} from '~/components/Forms/RecruitForm/utils';

import { css } from '@emotion/react';
import { memo } from 'react';
import { useWatch } from 'react-hook-form';

import { Icon, IconButton, NumberInput, SelectBox } from '~/components/Common';
import {
  RecruitParts,
  useRecruitFormContext,
} from '~/components/Forms/RecruitForm/utils';
import { flex } from '~/styles/utils';
import { createBoundClamp } from '~/utils';

const fieldArrayName = 'participants.project';

const possibleParts = Object.values(RecruitParts).filter(
  (part) => part !== RecruitParts.STUDY
);
const maxZIndex = possibleParts.length;
const maxCount = 20;
const minCount = 1;
const clamp = createBoundClamp([minCount, maxCount]);

const validateParticipantsCount = (value: number) => {
  if (value > maxCount || value < minCount)
    return `모집 인원은 파트당 ${minCount}명 ~ ${maxCount}명 사이만 가능합니다.`;
  return true;
};

const validateParticipantsPart = (value: string) => {
  return (
    possibleParts.includes(value as RecruitParts) || '모집 파트를 선택해주세요.'
  );
};

interface FieldRowProps {
  index: number;
  canRemoveField: boolean;
  remove: (index: number) => void;
}

const ProjectParticipantsFieldRow = memo((props: FieldRowProps) => {
  const { index, canRemoveField, remove } = props;
  const { register, setValue } = useRecruitFormContext();
  const participants = useWatch<RecruitFormValues>({
    name: `${fieldArrayName}.${index}`,
  }) as RecruitParticipants;
  const { part, count } = participants;
  const partFieldName = `${fieldArrayName}.${index}.part` as const;
  const countFieldName = `${fieldArrayName}.${index}.count` as const;
  const style = { zIndex: maxZIndex - index };

  const handleRemoveField = () => {
    if (!canRemoveField) return;
    remove(index);
  };

  const handleChangeCount = (amount: number) => () => {
    setValue(countFieldName, clamp(count + amount));
  };
  const handleChangePart = (value: string) => setValue(partFieldName, value);

  register(partFieldName, {
    validate: validateParticipantsPart,
  });

  return (
    <div css={fieldRowCss} style={style}>
      <SelectBox
        triggerTextAlign="center"
        css={fieldCss}
        items={possibleParts}
        size="md"
        value={part}
        onValueChange={handleChangePart}
        triggerPaddingX={20}
      />
      <NumberInput
        css={fieldCss}
        min={minCount}
        max={maxCount}
        onClickMinus={handleChangeCount(-1)}
        onClickPlus={handleChangeCount(1)}
        {...register(countFieldName, {
          validate: validateParticipantsCount,
          valueAsNumber: true,
        })}
      />
      <IconButton
        size={20}
        css={removeFieldButtonCss}
        onClick={handleRemoveField}
        disabled={!canRemoveField}
      >
        <Icon name="circle.minus" size={14} label="필드 제거" />
      </IconButton>
    </div>
  );
});

ProjectParticipantsFieldRow.displayName = 'ProjectParticipantsFieldRow';

export default ProjectParticipantsFieldRow;

const removeFieldButtonCss = css({
  flexShrink: 0,
});

const fieldRowCss = css(flex('center', 'flex-start', 'row', 8));

const fieldCss = css({
  width: '50%',
});
