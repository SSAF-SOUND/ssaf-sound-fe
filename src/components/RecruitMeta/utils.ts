import type { IconNames } from '../Common/Icon';

export type InfoType = '모집 인원' | '모집 기간' | '기술 스택';
// 위의 type들 나중에 types로 이전할 예정

interface InfoConstantsTypes {
  icon: IconNames;
  title: InfoType;
  id: ProjectInfoIds;
}

export type ProjectInfoIds = 'personnel' | 'period' | 'stack';
export const PROJECT_INFO: Record<ProjectInfoIds, InfoConstantsTypes> = {
  personnel: {
    id: 'personnel',
    icon: 'group',
    title: '모집 인원',
  },
  period: {
    id: 'period',
    icon: 'calendar',
    title: '모집 기간',
  },
  stack: {
    id: 'stack',
    icon: 'skill',
    title: '기술 스택',
  },
};
