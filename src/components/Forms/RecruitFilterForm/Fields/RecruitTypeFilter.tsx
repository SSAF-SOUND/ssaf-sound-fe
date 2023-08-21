import type { MouseEvent } from 'react';
import type { Control } from 'react-hook-form';
import type { RecruitCategory } from '~/services/recruit';

import { css } from '@emotion/react';
import { Controller } from 'react-hook-form';

import { ToggleGroup } from '~/components/Common';
import { getRecruitThemeByCategory } from '~/services/recruit';
import { flex, fontCss } from '~/styles/utils';

import { RecruitResetButton } from '../RecruitResetButton';

interface RecruitTypeFilterProps {
  reset: (e: MouseEvent<HTMLButtonElement>) => void;
  control: Control;
  defaultValue?: string[];
  category?: RecruitCategory;
}
export const RecruitTypeFilter = (props: RecruitTypeFilterProps) => {
  const { reset, control, defaultValue = '앱', category = 'project' } = props;
  return (
    <label css={selfCss}>
      <div css={flex('', 'space-between', 'row')}>
        <span>모집 파트</span>
        <RecruitResetButton onClick={reset} />
      </div>
      <Controller
        render={({ field }) => {
          const { value, onChange, ...restField } = field;
          return (
            <ToggleGroup
              items={['앱', '프론트엔드', '백엔드', '기획/디자인']}
              value={value}
              theme={getRecruitThemeByCategory(category)}
              onValueChange={onChange}
              css={flex('center', '', 'row', 10, 'wrap')}
              {...restField}
            />
          );
        }}
        name="recruitType"
        control={control}
        defaultValue={defaultValue}
      />
    </label>
  );
};

const selfCss = css(
  fontCss.family.auto,
  fontCss.style.B18,
  flex('', '', 'column', 10)
);
