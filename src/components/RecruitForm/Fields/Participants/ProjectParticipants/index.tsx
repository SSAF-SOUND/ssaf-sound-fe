import type { RecruitFormValues } from '~/components/RecruitForm/utils';

import { css } from '@emotion/react';
import { useFieldArray } from 'react-hook-form';

import { Button, Icon } from '~/components/Common';
import { parts } from '~/components/RecruitForm/utils';
import { flex } from '~/styles/utils';

import ProjectParticipantsFieldRow from './ProjectParticipantsFieldRow';

const fieldArrayName = 'participants.project';

const ProjectParticipants = () => {
  const { fields, append, remove } = useFieldArray<RecruitFormValues>({
    name: fieldArrayName,
    rules: {
      minLength: 1,
      maxLength: parts.length,
    },
  });

  const canAddField = fields.length < parts.length;
  const canRemoveField = fields.length > 1;

  const handleAddField = () => {
    if (!canAddField) return;

    append({
      part: '',
      count: 1,
    });
  };

  return (
    <div>
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
  width: '100%',
  height: 34,
});

const fieldContainerCss = css(
  {
    position: 'relative',
  },
  flex('', '', 'column', 10)
);
