import type { RecruitCategory } from '~/services/recruit';

import Link from 'next/link';

import { useEffect, useState } from 'react';

import { getRecruitThemeByCategory } from '~/services/recruit';
import { routes } from '~/utils';

import { CircleButton } from '../Common';

export const RecruitCreateButton = (props: { category: RecruitCategory }) => {
  const { category = 'project' } = props;

  const [value, setValue] = useState(category);

  useEffect(() => {
    setValue(category);
  }, [category]);

  return (
    <Link href={routes.recruit.new()}>
      <CircleButton
        name="pencil.plus"
        theme={getRecruitThemeByCategory(value)}
        css={{ width: 43, height: 43 }}
      />
    </Link>
  );
};
