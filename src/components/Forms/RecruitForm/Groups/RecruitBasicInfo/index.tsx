import type { RecruitFormValues } from '~/components/Forms/RecruitForm/utils';

import { css } from '@emotion/react';
import { ErrorMessage } from '@hookform/error-message';
import { useWatch } from 'react-hook-form';

import { AlertText } from '~/components/Common/AlertText';
import FieldOverview from '~/components/Forms/RecruitForm/Common/FieldOverview';
import { RecruitFormAccordion } from '~/components/Forms/RecruitForm/Common/RecruitFormAccordion';
import SelectedSkills from '~/components/Forms/RecruitForm/Common/SelectedSkills';
import {
  EndDate,
  Participants,
  Skills,
} from '~/components/Forms/RecruitForm/Fields';
import { RecruitCategoryName } from '~/services/recruit';

interface RecruitBasicInfoProps {
  className?: string;
}

export const RecruitBasicInfo = (props: RecruitBasicInfoProps) => {
  return (
    <div {...props}>
      <FieldOverview>리쿠르팅 기본 정보</FieldOverview>

      <RecruitFormAccordion.Root>
        <ParticipantsLayer />

        <EndDateLayer />

        <SkillsLayer />
      </RecruitFormAccordion.Root>
    </div>
  );
};

const participantsFieldName = 'participants';
const categoryFieldName = 'category';
const ParticipantsLayer = () => {
  const { project, study } = useWatch<RecruitFormValues>({
    name: participantsFieldName,
  }) as RecruitFormValues['participants'];

  const category = useWatch<RecruitFormValues>({
    name: categoryFieldName,
  }) as RecruitFormValues['category'];

  const targetParticipants =
    category === RecruitCategoryName.PROJECT ? project : study;

  const summary = targetParticipants
    .filter(({ part }) => !!part)
    .map(({ part, count }) => `${part} ${count}명`)
    .join(', ');

  return (
    <RecruitFormAccordion.Item value="모집 인원">
      <RecruitFormAccordion.Trigger titleIconName="group" summary={summary}>
        모집 인원
      </RecruitFormAccordion.Trigger>

      <ParticipantsErrorLayer selectedCategory={category} />

      <RecruitFormAccordion.Content initiallyForceMountThenUnmountImmediately>
        <Participants />
      </RecruitFormAccordion.Content>
    </RecruitFormAccordion.Item>
  );
};

interface ParticipantsErrorLayerProps {
  selectedCategory: string;
}

const myPartFieldName = 'myPart';

const ParticipantsErrorLayer = (props: ParticipantsErrorLayerProps) => {
  const { selectedCategory } = props;
  const isProjectCategorySelected =
    selectedCategory === RecruitCategoryName.PROJECT;
  const categoryFieldName = isProjectCategorySelected ? 'project' : 'study';
  const categoryErrorFieldName = `participants.${categoryFieldName}.root`;

  return (
    <>
      <ErrorMessage
        name={categoryErrorFieldName}
        render={({ message }) => (
          <AlertText css={errorLayerSelfCss}>{message}</AlertText>
        )}
      />
      {isProjectCategorySelected && (
        <ErrorMessage
          name={myPartFieldName}
          render={({ message }) => (
            <AlertText css={errorLayerSelfCss}>{message}</AlertText>
          )}
        />
      )}
    </>
  );
};

// EndDate
const endDateFieldName = 'endDate';

const EndDateLayer = () => {
  const endDate = useWatch<RecruitFormValues>({
    name: endDateFieldName,
  }) as RecruitFormValues['endDate'];

  return (
    <RecruitFormAccordion.Item value="모집 마감일 선택">
      <RecruitFormAccordion.Trigger titleIconName="calendar" summary={endDate}>
        모집 마감일 선택
      </RecruitFormAccordion.Trigger>
      <EndDateErrorLayer />
      <RecruitFormAccordion.Content initiallyForceMountThenUnmountImmediately>
        <EndDate />
      </RecruitFormAccordion.Content>
    </RecruitFormAccordion.Item>
  );
};

const EndDateErrorLayer = () => {
  const errorFieldName = `endDate`;

  return (
    <ErrorMessage
      name={errorFieldName}
      render={({ message }) => (
        <AlertText css={errorLayerSelfCss}>{message}</AlertText>
      )}
    />
  );
};

// Skills
const SkillsLayer = () => {
  return (
    <RecruitFormAccordion.Item value="기술 스택">
      <RecruitFormAccordion.Trigger
        titleIconName="board"
        summary={
          <SelectedSkills
            css={{ marginTop: 6, paddingBottom: 2 }}
            withLabel={false}
            mountOnlySelectedSkillExists={true}
          />
        }
        summaryContainerStyle={{ margin: 0 }}
      >
        기술 스택
      </RecruitFormAccordion.Trigger>
      <RecruitFormAccordion.Content>
        <Skills />
      </RecruitFormAccordion.Content>
    </RecruitFormAccordion.Item>
  );
};

const errorLayerSelfCss = css({
  padding: '0 25px 6px',
});
