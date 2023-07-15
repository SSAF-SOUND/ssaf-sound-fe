import type { TabsListProps } from '@radix-ui/react-tabs';

import { css } from '@emotion/react';
import * as Tabs from '@radix-ui/react-tabs';

const List = (props: TabsListProps) => {
  const { children, ...rest } = props;
  return (
    <Tabs.List css={selfCss} {...rest}>
      {children}
    </Tabs.List>
  );
};

const selfCss = css({
  display: 'flex',
  position: 'relative',
});

export default List;
