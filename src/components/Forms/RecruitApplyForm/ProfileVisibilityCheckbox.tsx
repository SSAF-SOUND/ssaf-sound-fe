import type { CheckboxProps } from '~/components/Common/Checkbox';
import type { RecruitCategory } from '~/services/recruit';

import { css } from '@emotion/react';

import { Checkbox } from '~/components/Common';
import { getRecruitThemeByCategory } from '~/services/recruit';
import { flex, palettes } from '~/styles/utils';

import { ApplyQuestion } from './ApplyQuestion';

interface ProfileVisibilityCheckbox extends CheckboxProps {
  loading?: boolean;
  category?: RecruitCategory;
  order?: number;
}

export const ProfileVisibilityCheckbox = (props: ProfileVisibilityCheckbox) => {
  const { loading = false, category = 'project', order, ...restProps } = props;

  return (
    <label css={selfCss}>
      <ApplyQuestion order={order} />
      <div css={wrapperCss}>
        <p>동의 합니다.</p>
        <Checkbox
          disabled={loading}
          theme={getRecruitThemeByCategory(category)}
          {...restProps}
        />
      </div>
    </label>
  );
};

const selfCss = css(flex('', '', 'column', 8));

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
