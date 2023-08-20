import { css } from '@emotion/react';
import * as Tabs from '@radix-ui/react-tabs';

import { flex } from '~/styles/utils';

export const LunchTabContent = (props: Tabs.TabsContentProps) => {
  const { children, ...restProps } = props;
  return (
    <Tabs.Content css={selfCss} {...restProps}>
      {children}
    </Tabs.Content>
  );
};

const selfCss = css(
  {
    width: '100%',
  },
  flex()
);
