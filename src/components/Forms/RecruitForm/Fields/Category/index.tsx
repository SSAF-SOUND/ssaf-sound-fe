import { css } from '@emotion/react';
import * as RadioGroup from '@radix-ui/react-radio-group';

import FieldOverview from '~/components/Forms/RecruitForm/Common/FieldOverview';
import { RecruitCategoryName } from '~/services/recruit';
import {
  colorMix,
  flex,
  fontCss,
  palettes,
  themeColorVars,
} from '~/styles/utils';

import { useRecruitFormContext } from '../../utils';

export interface CategoryProps {
  className?: string;
  editMode?: boolean;
}

const fieldName = 'category';

export const Category = (props: CategoryProps) => {
  const { className, editMode = false } = props;

  const {
    setValue,
    formState: { defaultValues: { category: defaultCategory } = {} },
  } = useRecruitFormContext();

  const onCategoryChange = (value: RecruitCategoryName) =>
    setValue(fieldName, value, { shouldDirty: true });

  return (
    <div className={className}>
      <FieldOverview>리쿠르팅 유형</FieldOverview>
      <RadioGroup.Root
        defaultValue={defaultCategory}
        css={radioGroupCss}
        onValueChange={onCategoryChange}
        disabled={editMode}
      >
        <RadioItem value={RecruitCategoryName.PROJECT} theme="primary">
          프로젝트
        </RadioItem>
        <RadioItem value={RecruitCategoryName.STUDY} theme="secondary">
          스터디
        </RadioItem>
      </RadioGroup.Root>
    </div>
  );
};

const radioGroupCss = css(
  {
    width: '100%',
    backgroundColor: palettes.grey5,
    borderRadius: 8,
    overflow: 'hidden',
    padding: 2,
    '&:disabled': {},
  },
  flex('center', '', 'row'),
  fontCss.family.auto
);

interface RadioItemProps {
  value: RecruitCategoryName;
  theme: string;
  children: string;
}

const RadioItem = (props: RadioItemProps) => {
  const { children, value, theme } = props;
  return (
    <RadioGroup.Item value={value} css={radioItemCss} data-theme={theme}>
      <RadioGroup.Indicator forceMount>{children}</RadioGroup.Indicator>
    </RadioGroup.Item>
  );
};

const radioItemCss = css(
  {
    position: 'relative',
    cursor: 'pointer',
    padding: 0,
    height: 28,
    width: '50%',
    borderRadius: 8,
    flexGrow: 1,
    '&:hover': {
      backgroundColor: colorMix('70%', palettes.grey3),
    },
    '&:disabled': {
      pointerEvents: 'none',
      backgroundColor: colorMix('30%', palettes.black),
    },
    '&[data-state="checked"]': {
      backgroundColor: themeColorVars.mainColor.var,
      color: colorMix('70%', palettes.black),
    },
  },
  fontCss.style.B14
);
