import { css } from '@emotion/react';
import * as RadioGroup from '@radix-ui/react-radio-group';

import FieldOverview from '~/components/Forms/RecruitForm/Common/FieldOverview';
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

  const onValueChange = (value: string) =>
    setValue(fieldName, value, { shouldDirty: true });

  return (
    <div className={className}>
      <FieldOverview>리쿠르팅 유형</FieldOverview>
      <RadioGroup.Root
        defaultValue={defaultCategory}
        css={radioGroupCss}
        onValueChange={onValueChange}
        disabled={editMode}
      >
        <RadioGroup.Item
          value="프로젝트"
          css={radioItemCss}
          data-theme="primary"
        >
          <RadioGroup.Indicator forceMount>프로젝트</RadioGroup.Indicator>
        </RadioGroup.Item>
        <RadioGroup.Item
          value="스터디"
          css={radioItemCss}
          data-theme="secondary"
        >
          <RadioGroup.Indicator forceMount>스터디</RadioGroup.Indicator>
        </RadioGroup.Item>
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
    },
  },
  fontCss.style.B14
);
