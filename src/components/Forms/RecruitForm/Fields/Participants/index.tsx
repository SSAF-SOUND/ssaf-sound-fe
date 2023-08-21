import type { RecruitFormValues } from '~/components/Forms/RecruitForm/utils';

import { useWatch } from 'react-hook-form';

import { RecruitCategoryName } from '~/components/Forms/RecruitForm/utils';

import ProjectParticipants from './ProjectParticipants';
import StudyParticipants from './StudyParticipants';

export const Participants = () => {
  const category = useWatch<RecruitFormValues>({
    name: 'category',
  }) as string;

  return (
    <>
      {category === RecruitCategoryName.PROJECT && <ProjectParticipants />}
      {category === RecruitCategoryName.STUDY && <StudyParticipants />}
    </>
  );
};
