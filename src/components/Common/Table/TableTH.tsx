import type { IconNames } from '../../Common/Icon';
import type { ComponentPropsWithoutRef } from 'react';

import { css } from '@emotion/react';

import { fontCss, inlineFlex } from '~/styles/utils';

import { Icon } from '../../Common';

interface RecruitTableRowHeadProps extends ComponentPropsWithoutRef<'th'> {
  icon?: IconNames;
  title: string;
}

const TableTH = (props: RecruitTableRowHeadProps) => {
  const { icon, title, ...restProps } = props;
  return (
    <th scope="row" css={titleBoxCss} {...restProps}>
      {icon && <Icon name={icon} size={13} />}
      <span css={textCss}>{title}</span>
    </th>
  );
};

const textCss = css(fontCss.style.R14);
const titleBoxCss = css(inlineFlex('center', 'center', 'row', 6));

export default TableTH;
