import type { RecruitFormValues } from '~/components/Forms/RecruitForm/utils';

import { useWatch } from 'react-hook-form';

import ProjectParticipants from './ProjectParticipants';
import StudyParticipants from './StudyParticipants';

export const Participants = () => {
  const category = useWatch<RecruitFormValues>({
    name: 'category'
  });

  return (
    <div>
      {category === '프로젝트' ? (
        <ProjectParticipants />
      ) : (
        <StudyParticipants />
      )}
    </div>
  );
};
