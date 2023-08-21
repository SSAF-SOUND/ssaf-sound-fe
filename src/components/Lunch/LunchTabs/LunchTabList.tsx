import { css } from '@emotion/react';
import * as Tabs from '@radix-ui/react-tabs';

import { flex } from '~/styles/utils';

export const LunchTabList = (props: Tabs.TabsListProps) => {
  const { children, ...restProps } = props;
  return (
    <Tabs.List css={selfCss} {...restProps}>
      {children}
    </Tabs.List>
  );
};

const selfCss = css(flex('center', 'center', 'row'));
