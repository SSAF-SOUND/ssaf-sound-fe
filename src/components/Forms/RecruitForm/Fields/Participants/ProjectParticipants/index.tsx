import type {
  RecruitParticipants,
  RecruitFormValues,
} from '~/components/Forms/RecruitForm/utils';

import { css } from '@emotion/react';
import { useFieldArray } from 'react-hook-form';

import { Button, Icon } from '~/components/Common';
import FieldOverview from '~/components/Forms/RecruitForm/Common/FieldOverview';
import { RecruitParts } from '~/components/Forms/RecruitForm/utils';
import { flex } from '~/styles/utils';

import ProjectParticipantsFieldRow from './ProjectParticipantsFieldRow';

const fieldArrayName = 'participants.project';
const initialParticipantsFieldValue = {
  part: '',
  count: 1,
};
const projectParticipantsMaxLength = Object.values(RecruitParts).filter(
  (part) => part !== RecruitParts.STUDY
).length;
const projectParticipantsMinLength = 1;
const validateProjectParticipants = (value: RecruitParticipants[]) => {
  const parts = value.map(({ part }) => part);

  if (new Set([...parts]).size !== parts.length) {
    return '모집 파트는 중복이 불가능합니다.';
  }

  return true;
};

const ProjectParticipants = () => {
  const { fields, append, remove } = useFieldArray<RecruitFormValues>({
    name: fieldArrayName,
    rules: {
      minLength: projectParticipantsMinLength,
      maxLength: projectParticipantsMaxLength,
      validate: validateProjectParticipants,
    },
  });

  const canAddField = fields.length < projectParticipantsMaxLength;
  const canRemoveField = fields.length > projectParticipantsMinLength;

  const handleAddField = () => {
    if (!canAddField) return;

    append(initialParticipantsFieldValue);
  };

  return (
    <div>
      <FieldOverview>모집파트 별 인원</FieldOverview>
      <div css={fieldContainerCss}>
        {fields.map((field, index) => (
          <ProjectParticipantsFieldRow
            key={field.id}
            index={index}
            canRemoveField={canRemoveField}
            remove={remove}
          />
        ))}
      </div>
      <Button
        css={addFieldButtonCss}
        variant="outlined"
        theme="primary"
        onClick={handleAddField}
        disabled={!canAddField}
      >
        <Icon name="circle.plus" label="필드 추가" size={14} />
      </Button>
    </div>
  );
};

export default ProjectParticipants;

const addFieldButtonCss = css({
  width: 'calc(100% - 26px)',
  height: 34,
});

const fieldContainerCss = css(
  { position: 'relative', marginBottom: 12, zIndex: 1 },
  flex('', '', 'column', 10)
);
