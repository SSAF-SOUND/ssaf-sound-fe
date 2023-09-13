import type { RecruitFilterFormValues } from '~/components/Forms/RecruitFilterForm/utils';

import { css } from '@emotion/react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { memo, useCallback } from 'react';
import { useWatch } from 'react-hook-form';

import SkillBadge from '~/components/SkillBadge';
import { SkillName } from '~/services/recruit';
import { flex } from '~/styles/utils';

import { RecruitFilterFieldTitleBar } from '../RecruitFilterFieldTitleBar';
import { useRecruitFilterFormContext } from '../utils';

const fieldName = 'skills';
const possibleSkills = Object.values(SkillName);

interface RecruitSkillsFieldProps {
  className?: string;
}
export const RecruitSkillsField = (props: RecruitSkillsFieldProps) => {
  const { register, setValue, resetField } = useRecruitFilterFormContext();
  const skills = useWatch<RecruitFilterFormValues>({
    name: fieldName,
  }) as string[];

  const onClickReset = useCallback(() => {
    resetField(fieldName, { defaultValue: [] });
  }, [resetField]);

  const onValueChange = (value: string[]) => {
    setValue(fieldName, value as SkillName[], {
      shouldDirty: true,
    });
  };

  register(fieldName);

  return (
    <div {...props}>
      <RecruitFilterFieldTitleBar
        title="기술 스택"
        onClickReset={onClickReset}
      />

      <ToggleGroup.Root
        type="multiple"
        value={skills ?? []}
        onValueChange={onValueChange}
        css={groupCss}
        orientation="horizontal"
      >
        {possibleSkills.map((recruitPart) => (
          <ToggleItem value={recruitPart} key={recruitPart} />
        ))}
      </ToggleGroup.Root>
    </div>
  );
};

const groupCss = css(flex('center', '', 'row', 0, 'wrap'), {
  rowGap: 14,
  columnGap: 8,
});

const ToggleItem = memo((props: { value: SkillName }) => {
  const { value } = props;
  return (
    <ToggleGroup.Item asChild value={value}>
      <SkillBadge name={value} />
    </ToggleGroup.Item>
  );
});

ToggleItem.displayName = 'ToggleItem';
