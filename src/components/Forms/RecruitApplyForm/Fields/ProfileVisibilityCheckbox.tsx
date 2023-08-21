import type { QuestionProps } from './ApplyQuestion';
import type { CheckboxProps } from '~/components/Common/Checkbox';
import type { RecruitCategory } from '~/services/recruit';

import { css } from '@emotion/react';

import { Checkbox } from '~/components/Common';
import { getRecruitThemeByCategory } from '~/services/recruit';
import { flex, palettes } from '~/styles/utils';

import { ApplyQuestion } from './ApplyQuestion';
import { LabelWrapper } from './LabelWrapper';
import { disabledCss } from './utils';

interface ProfileVisibilityCheckbox extends CheckboxProps {
  loading?: boolean;
  category?: RecruitCategory;
}

type ProfileVisibilityCheckboxWithQuestion = ProfileVisibilityCheckbox &
  QuestionProps;

export const ProfileVisibilityCheckbox = (
  props: ProfileVisibilityCheckboxWithQuestion
) => {
  const {
    category = 'project',
    order = 1,
    question = '리쿠르팅 등록자에게 프로필이 공개됩니다. 이에 동의하십니까?',
    disabled,
    ...restProps
  } = props;

  return (
    <LabelWrapper>
      <ApplyQuestion order={order} question={question} />
      <div css={[wrapperCss, disabled && disabledCss]}>
        <p>동의 합니다.</p>
        <Checkbox
          disabled={disabled}
          theme={getRecruitThemeByCategory(category)}
          {...restProps}
        />
      </div>
    </LabelWrapper>
  );
};

const wrapperCss = css(
  {
    width: '100%',
    background: palettes.white,
    borderRadius: 8,
    padding: '10px 20px',
    height: 53,

    '> p': {
      color: palettes.black,
    },
  },
  flex('center', 'space-between', 'row')
);
