import type {
  RecruitParticipants,
  RecruitFormValues,
} from '~/components/Forms/RecruitForm/utils';

import { css } from '@emotion/react';
import { useFieldArray } from 'react-hook-form';

import { Button, Icon, SelectBox } from '~/components/Common';
import FieldOverview from '~/components/Forms/RecruitForm/Common/FieldOverview';
import {
  maxParticipantsCount,
  minParticipantsCount,
  possibleProjectParts,
  RecruitCategoryName,
  RecruitParts,
  useRecruitFormContext,
} from '~/components/Forms/RecruitForm/utils';
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

const possibleParts = Object.values(RecruitParts).filter(
  (part) => part !== RecruitParts.STUDY
);

const validateProjectParticipants = (
  value: RecruitParticipants[],
  formValues: RecruitFormValues
) => {
  // 카테고리가 선택되어 있는 경우, 프로젝트 필드들은 유효성 검사에 무조건 통과
  if (formValues.category !== RecruitCategoryName.PROJECT) {
    return true;
  }

  if (value.some((v) => !possibleParts.includes(v.part as RecruitParts)))
    return '모집 파트를 선택해주세요.';

  const parts = value.map(({ part }) => part);

  if (new Set([...parts]).size !== parts.length) {
    return '모집 파트는 중복이 불가능합니다.';
  }

  if (
    value.some(
      ({ count }) =>
        count < minParticipantsCount || count > maxParticipantsCount
    )
  )
    return `모집 인원은 파트당 ${minParticipantsCount}명 ~ ${maxParticipantsCount}명 사이만 가능합니다.`;

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
      <div css={{ marginBottom: 24 }}>
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

      <div>
        <FieldOverview>본인 파트</FieldOverview>
        <MyPart />
      </div>
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

const myPartFieldName = 'myPart';
const validateMyPart = (value: string, formValues: RecruitFormValues) => {
  if (formValues.category !== RecruitCategoryName.PROJECT) return true;

  return (
    possibleProjectParts.includes(value as RecruitParts) ||
    '본인의 파트를 선택해주세요'
  );
};

const MyPart = () => {
  const { register } = useRecruitFormContext();

  register(myPartFieldName, {
    validate: validateMyPart,
  });

  return <SelectBox items={possibleProjectParts} size="md" />;
};
