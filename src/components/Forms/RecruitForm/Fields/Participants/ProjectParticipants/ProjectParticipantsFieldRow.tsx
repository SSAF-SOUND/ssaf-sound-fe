import type { RecruitFormValues } from '~/components/Forms/RecruitForm/utils';
import type {
  RecruitParticipantsCount,
  RecruitParts,
} from '~/services/recruit';

import { css } from '@emotion/react';
import { memo } from 'react';
import { useWatch } from 'react-hook-form';

import { Icon, IconButton, NumberInput } from '~/components/Common';
import { SelectBox } from '~/components/Common/SelectBox';
import {
  maxParticipantsCount,
  minParticipantsCount,
  possibleProjectParts,
  useRecruitFormContext,
} from '~/components/Forms/RecruitForm/utils';
import { flex } from '~/styles/utils';
import { createBoundClamp } from '~/utils';

const fieldArrayName = 'participants.project';

const clamp = createBoundClamp([minParticipantsCount, maxParticipantsCount]);

interface FieldRowProps {
  index: number;
  canRemoveField: boolean;
  remove: (index: number) => void;
}

const ProjectParticipantsFieldRow = memo((props: FieldRowProps) => {
  const { index, canRemoveField, remove } = props;
  const participantsFieldName = `${fieldArrayName}.${index}` as const;
  const partFieldName = `${participantsFieldName}.part` as const;
  const countFieldName = `${participantsFieldName}.count` as const;

  const { register, setValue, trigger } = useRecruitFormContext();
  const participants = useWatch<RecruitFormValues>({
    name: participantsFieldName,
  }) as RecruitParticipantsCount;
  const { part, count } = participants;

  const handleRemoveField = () => {
    if (!canRemoveField) return;
    remove(index);
  };

  const handleChangeCount = (amount: number) => () => {
    setValue(countFieldName, clamp(count + amount), {
      shouldDirty: true,
    });
  };
  const onPartChange = (value: string) => {
    setValue(partFieldName, value as RecruitParts, {
      shouldDirty: true,
    });
    trigger(fieldArrayName);
  };

  register(participantsFieldName);

  register(partFieldName, {
    shouldUnregister: true,
  });

  return (
    <div css={fieldRowCss}>
      <SelectBox
        triggerTextAlign="center"
        css={fieldCss}
        items={possibleProjectParts}
        size="md"
        value={part}
        onValueChange={onPartChange}
        triggerPaddingX={20}
      />

      <NumberInput
        css={fieldCss}
        min={minParticipantsCount}
        max={maxParticipantsCount}
        onClickMinus={handleChangeCount(-1)}
        onClickPlus={handleChangeCount(1)}
        {...register(countFieldName, {
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
