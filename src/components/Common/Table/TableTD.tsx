import type { ComponentPropsWithoutRef } from 'react';

import { css } from '@emotion/react';

import { flex, fontCss } from '~/styles/utils';

const TableTD = (props: ComponentPropsWithoutRef<'td'>) => {
  const { children, ...restProps } = props;
  return (
    <td css={selfCss} {...restProps}>
      {children}
    </td>
  );
};

const selfCss = css(fontCss.style.R14, flex('center', 'center', 'row'));

export default TableTD;
