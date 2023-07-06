import type { TabsListProps } from '@radix-ui/react-tabs';

import { css } from '@emotion/react';
import * as Tabs from '@radix-ui/react-tabs';

import Border from './Border';

const List = (props: TabsListProps) => {
  const { children, ...rest } = props;
  return (
    <Tabs.List css={selfCss} {...rest}>
      <Border />
      {children}
    </Tabs.List>
  );
};

const selfCss = css({
  display: 'flex',
  position: 'relative',
});

export default List;
