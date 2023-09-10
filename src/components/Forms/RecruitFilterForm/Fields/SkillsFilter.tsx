import type { MouseEvent } from 'react';
import type { Control } from 'react-hook-form';

import { css } from '@emotion/react';
import { Controller } from 'react-hook-form';

import { ToggleGroup } from '~/components/Common';
import {
  SkillNameSet,
  getRecruitThemeByCategory,
  RecruitCategoryName,
} from '~/services/recruit';
import { flex, fontCss } from '~/styles/utils';

import { RecruitResetButton } from '../RecruitResetButton';

interface SkillsFilterProps {
  reset: (e: MouseEvent<HTMLButtonElement>) => void;
  control: Control;
  defaultValue?: string[];
  category?: RecruitCategoryName;
}
export const SkillsFilter = (props: SkillsFilterProps) => {
  const {
    reset,
    control,
    defaultValue = ['React'],
    category = RecruitCategoryName.PROJECT,
  } = props;

  return (
    <label css={selfCss}>
      <div css={flex('', 'space-between', 'row')}>
        <span>기술 스택</span>
        <RecruitResetButton onClick={reset} />
      </div>
      <Controller
        render={({ field }) => {
          const { value, onChange, ...restField } = field;
          return (
            <ToggleGroup
              items={[...SkillNameSet]}
              value={value}
              theme={getRecruitThemeByCategory(category)}
              onValueChange={onChange}
              asSkillBadge
              css={flex('center', '', 'row', 10, 'wrap')}
              {...restField}
            />
          );
        }}
        name="skills"
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
