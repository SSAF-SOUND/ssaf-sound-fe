import { useMemo } from 'react';

import { initialCampuses } from '~/services/meta/utils';

export const useCampuses = () => {
  const campuses = useMemo(() => {
    return [...initialCampuses]
      .sort((a, b) => a.id - b.id)
      .map(({ name }) => name);
  }, []);

  return { data: campuses };
};
