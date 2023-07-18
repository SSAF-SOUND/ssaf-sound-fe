import { css } from '@emotion/react';
import * as RadioGroup from '@radix-ui/react-radio-group';

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
  isProjectDisabled?: boolean;
  isStudyDisabled?: boolean;
}

const fieldName = 'category';

export const Category = (props: CategoryProps) => {
  const {
    className,
    isProjectDisabled = false,
    isStudyDisabled = false,
  } = props;

  const {
    setValue,
    formState: { defaultValues: { category: defaultCategory } = {} },
  } = useRecruitFormContext();

  const onValueChange = (value: string) => setValue(fieldName, value);

  return (
    <div className={className}>
      <RadioGroup.Root
        defaultValue={defaultCategory}
        css={radioGroupCss}
        onValueChange={onValueChange}
      >
        <RadioGroup.Item
          value="프로젝트"
          css={radioItemCss}
          data-theme="primary"
          disabled={isProjectDisabled}
        >
          <RadioGroup.Indicator forceMount>프로젝트</RadioGroup.Indicator>
        </RadioGroup.Item>
        <RadioGroup.Item
          value="스터디"
          css={radioItemCss}
          data-theme="secondary"
          disabled={isStudyDisabled}
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
  },
  flex('center', '', 'row'),
  fontCss.family.auto
);

const radioItemCss = css(
  {
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
      color: colorMix('70%', palettes.font.blueGrey),
      backgroundColor: 'transparent',
      cursor: 'not-allowed',
    },
    '&[data-state="checked"]': {
      backgroundColor: themeColorVars.mainColor.var,
    },
  },
  fontCss.style.B14
);
