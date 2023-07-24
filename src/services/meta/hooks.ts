import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { SsafyTrack } from '~/services/member';
import { getCampuses } from '~/services/meta/apis';

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
