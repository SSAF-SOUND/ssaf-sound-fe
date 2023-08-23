import type { RecruitFilterFormDefaultValues } from '../Forms/RecruitFilterForm';
import type { RecruitCategory } from '~/services/recruit';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { useState } from 'react';

import { useGetQueryString } from '~/hooks';
import { position, pageMinWidth, pageMaxWidth, palettes } from '~/styles/utils';

import { RecruitDetailOptionToggle } from './RecruitDetailOptionToggle';
import ModalCore from '../Common/Modal/Core';
import { RecruitFilterForm } from '../Forms/RecruitFilterForm';

interface RecruitFilterModalProps {
  defaultValues?: RecruitFilterFormDefaultValues;
  category?: RecruitCategory;
}

export const RecruitFilterModal = (props: RecruitFilterModalProps) => {
  const [open, setOpen] = useState(false);
  const { category = 'study' } = props;

  const router = useRouter();
  const { pathname, query } = router;
  const skills = useGetQueryString('skills');
  const recruitTypes = useGetQueryString('recruitTypes');

  const hasQueries = !!skills || !!recruitTypes;

  const newValues = {
    skills: !!skills ? skills.split(',') : [],
    recruitTypes: !!recruitTypes ? recruitTypes.split(',') : [],
  } as unknown as RecruitFilterFormDefaultValues;

  const submitHandler = (d: RecruitFilterFormDefaultValues) => {
    router.push({
      pathname,
      query: {
        ...query,
        skills: d.skills?.join(','),
        recruitTypes: d.recruitTypes?.join(','),
      },
    });

    setOpen(false);
  };
  return (
    <ModalCore
      open={open}
      content={
        <div css={layerCss}>
          <RecruitFilterForm
            submitHandler={submitHandler}
            defaultValues={newValues}
            category={category}
          />
        </div>
      }
      trigger={
        <RecruitDetailOptionToggle
          onClick={() => setOpen(!open)}
          category={category}
          isActive={hasQueries}
        />
      }
      onPointerDownOutside={() => setOpen(false)}
    />
  );
};

const layerCss = css(position.xy('center', 'end'), {
  position: 'fixed',
  width: '100%',
  minWidth: pageMinWidth,
  maxWidth: pageMaxWidth,
  background: palettes.background.default,
  padding: '20px',
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
});
