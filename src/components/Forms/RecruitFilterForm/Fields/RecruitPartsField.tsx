import type { RecruitFilterFormValues } from '~/components/Forms/RecruitFilterForm/utils';

import { css } from '@emotion/react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { memo, useCallback } from 'react';
import { useWatch } from 'react-hook-form';

import { Badge } from '~/components/Common';
import { RecruitFilterFieldTitleBar } from '~/components/Forms/RecruitFilterForm/RecruitFilterFieldTitleBar';
import { useRecruitFilterFormContext } from '~/components/Forms/RecruitFilterForm/utils';
import { RecruitParts } from '~/services/recruit';
import { flex } from '~/styles/utils';

const possibleParts = Object.values(RecruitParts).filter(
  (part) => part !== RecruitParts.STUDY
);

const fieldName = 'recruitParts';

interface RecruitPartsFieldProps {
  className?: string;
}
export const RecruitPartsField = (props: RecruitPartsFieldProps) => {
  const { register, setValue, resetField } = useRecruitFilterFormContext();
  const recruitParts = useWatch<RecruitFilterFormValues>({
    name: fieldName,
  }) as string[];

  const onClickReset = useCallback(() => {
    resetField(fieldName, { defaultValue: [] });
  }, [resetField]);

  const onValueChange = (value: string[]) => {
    setValue(fieldName, value as RecruitParts[], {
      shouldDirty: true,
    });
  };

  register(fieldName);

  return (
    <div {...props}>
      <RecruitFilterFieldTitleBar
        title="모집 파트"
        onClickReset={onClickReset}
      />

      <ToggleGroup.Root
        type="multiple"
        value={recruitParts ?? []}
        onValueChange={onValueChange}
        css={groupCss}
        orientation="horizontal"
      >
        {possibleParts.map((recruitPart) => (
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

const ToggleItem = memo((props: { value: RecruitParts }) => {
  const { value } = props;
  return (
    <ToggleGroup.Item asChild value={value}>
      <Badge>{value}</Badge>
    </ToggleGroup.Item>
  );
});

ToggleItem.displayName = 'ToggleItem';
