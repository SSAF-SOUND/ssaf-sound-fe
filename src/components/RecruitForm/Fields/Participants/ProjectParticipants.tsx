import type { RecruitFormValues } from '~/components/RecruitForm/type';

import { css } from '@emotion/react';
import { memo } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';

import {
  Button,
  Icon,
  IconButton,
  NumberInput,
  SelectBox,
} from '~/components/Common';
import { useRecruitFormContext } from '~/components/RecruitForm/useRecruitFormContext';
import { flex } from '~/styles/utils';
import { createBoundClamp } from '~/utils';

const fieldArrayName = 'participants.project';
const fieldName = {
  part: 'part',
  count: 'count',
};

const parts = ['프론트엔드', '백엔드', '기획/디자인', '앱'];

const ProjectParticipants = () => {
  const { fields, append, remove } = useFieldArray({
    name: fieldArrayName,
  });

  const addField = () => {
    if (fields.length >= parts.length) return;

    append({
      [fieldName.part]: '',
      [fieldName.count]: 1,
    });
  };

  return (
    <div>
      <div css={fieldContainerCss}>
        {fields.map((field, index) => (
          <ProjectParticipantsFieldRow
            key={field.id}
            index={index}
            removeField={remove}
          />
        ))}
      </div>
      <Button
        css={addFieldButtonCss}
        variant="outlined"
        theme="primary"
        onClick={addField}
        disabled={fields.length >= parts.length}
      >
        <Icon name="circle.plus" label="필드 추가" size={14} />
      </Button>
    </div>
  );
};

interface FieldRowProps {
  index: number;
  removeField: (index: number) => void;
}

const maxZIndex = 100;
const maxCount = 20;
const minCount = 1;
const clamp = createBoundClamp([minCount, maxCount]);

const validateParticipantsCount = (value: number) => {
  if (value > 20 || value < 1)
    return '모집 인원은 파트당 1명 ~ 20명 사이만 가능합니다.';
};
const validateParticipantsPart = (value: string) => {
  return parts.includes(value) || '모집 파트를 선택해주세요.';
};

const ProjectParticipantsFieldRow = memo((props: FieldRowProps) => {
  const { index, removeField } = props;
  const {
    register,
    setValue,
    formState: { errors },
  } = useRecruitFormContext();
  const { participants } = useWatch<RecruitFormValues>();
  console.log(errors);
  const { part = '', count = 1 } = participants?.project?.[index] || {};
  const partFieldName = `${fieldArrayName}.${index}.part` as const;
  const countFieldName = `${fieldArrayName}.${index}.count` as const;
  const style = { zIndex: maxZIndex - index };

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
        items={parts}
        size="md"
        value={part}
        onValueChange={handleChangePart}
      />
      <NumberInput
        css={fieldCss}
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
        onClick={() => removeField(index)}
      >
        <Icon name="circle.minus" size={14} label="필드 제거" />
      </IconButton>
    </div>
  );
});

ProjectParticipantsFieldRow.displayName = 'ProjectParticipantsFieldRow';

export default ProjectParticipants;

const addFieldButtonCss = css({
  width: '100%',
  height: 34,
});

const removeFieldButtonCss = css({
  flexShrink: 0,
});

const fieldContainerCss = css(
  {
    position: 'relative',
  },
  flex('', '', 'column', 10)
);

const fieldRowCss = css(flex('center', 'flex-start', 'row', 8));

const fieldCss = css({
  width: '50%',
});
