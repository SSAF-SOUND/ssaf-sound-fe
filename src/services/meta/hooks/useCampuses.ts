import { useMemo } from 'react';

export const initialCampuses = [
  { id: 1, name: '서울' },
  { id: 2, name: '대전' },
  { id: 3, name: '광주' },
  { id: 4, name: '구미' },
  { id: 5, name: '부울경' },
];

export const useCampuses = () => {
  const campuses = useMemo(() => {
    return [...initialCampuses]
      .sort((a, b) => a.id - b.id)
      .map(({ name }) => name);
  }, []);

  return { data: campuses };
};
