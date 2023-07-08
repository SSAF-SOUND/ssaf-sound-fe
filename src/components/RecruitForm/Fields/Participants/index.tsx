import type { RecruitFormValues } from '~/components/RecruitForm/type';

import { useWatch } from 'react-hook-form';

import ProjectParticipants from './ProjectParticipants';

export interface ParticipantsProps {}

export const Participants = (props: ParticipantsProps) => {
  const { category } = useWatch<RecruitFormValues>();

  return <div>{category === '프로젝트' ? <ProjectParticipants /> : <></>}</div>;
};
