import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { SsafyTrack } from '~/services/member';
import { getCampuses, getRecruitTypes } from '~/services/meta/apis';
import { RecruitType } from '../recruit';

export const initialCampuses = [
  { id: 1, name: '서울' },
  { id: 2, name: '대전' },
  { id: 3, name: '광주' },
  { id: 4, name: '구미' },
  { id: 5, name: '부울경' },
];

export const useCampuses = () => {
  return useQuery({
    queryKey: queryKeys.meta.campuses(),
    queryFn: getCampuses,
    initialData: initialCampuses,
    select: (data) => {
      return [...data]
        .sort(({ id: id1 }, { id: id2 }) => id1 - id2)
        .map(({ name }) => name);
    },
  });
};

export const useTracks = () => {
  return {
    data: Object.values(SsafyTrack),
  };
};

export const useYears = () => {
  const maxYear = 10;
  return {
    data: Array(maxYear)
      .fill(undefined)
      .map((_, i) => i + 1),
  };
};

export const initialRecruitType = {
  recruitTypes: [
    {
      id: 4,
      name: '앱',
    },
    {
      id: 2,
      name: '프론트엔드',
    },
    {
      id: 3,
      name: '백엔드',
    },
    {
      id: 1,
      name: '기획/디자인',
    },
    {
      id: 0,
      name: '스터디',
    },
  ],
};

export const useRecruitTypes = () => {
  return useQuery({
    queryKey: queryKeys.meta.recruitTypes(),
    queryFn: getRecruitTypes,
    initialData: initialRecruitType,
    select: (data: any) => {
      return data.recruitTypes.map(({ name }: { name: RecruitType }) => name);
    },
  });
};
