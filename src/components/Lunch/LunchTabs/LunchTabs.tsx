import type { ReactNode } from 'react';

import * as Tabs from '@radix-ui/react-tabs';

import { Separator } from '~/components/Common';
import { palettes } from '~/styles/utils';

import { LunchTabList } from './LunchTabList';
import { LunchTabTriggerWithLink } from './LunchTabTriggerWithLink';

interface LunchTabsProps {
  content?: ReactNode;
}

export const LunchTabs = (props: LunchTabsProps) => {
  const { content } = props;
  return (
    <Tabs.Root css={{ width: '100%' }}>
      <LunchTabList>
        <LunchTabTriggerWithLink value="today">오늘</LunchTabTriggerWithLink>
        <Separator
          orientation="vertical"
          width={4}
          height={30}
          css={{
            background: palettes.primary.default,
          }}
        />
        <LunchTabTriggerWithLink value="tomorrow">내일</LunchTabTriggerWithLink>
      </LunchTabList>
      {content}
    </Tabs.Root>
  );
};
