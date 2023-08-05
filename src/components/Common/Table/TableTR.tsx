import type { ComponentPropsWithoutRef } from 'react';

import { css } from '@emotion/react';

import { flex } from '~/styles/utils';

const TableRow = (props: ComponentPropsWithoutRef<'tr'>) => {
  const { children, ...restProps } = props;
  return (
    <tr css={selfCss} {...restProps}>
      {children}
    </tr>
  );
};

const selfCss = css(flex('', '', 'row', 30));

export default TableRow;
