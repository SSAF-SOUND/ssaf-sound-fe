import * as Tabs from '@radix-ui/react-tabs';

import { Separator } from '~/components/Common';
import { LunchDateSpecifier } from '~/services/lunch/utils';
import { palettes } from '~/styles/utils';

import { LunchTabList } from './LunchTabList';
import { LunchTabTriggerWithLink } from './LunchTabTriggerWithLink';

export const LunchTabs = () => {
  return (
    <Tabs.Root>
      <LunchTabList>
        <LunchTabTriggerWithLink value={LunchDateSpecifier.TODAY}>
          오늘
        </LunchTabTriggerWithLink>
        <LunchTabSeparator />
        <LunchTabTriggerWithLink value={LunchDateSpecifier.TOMORROW}>
          내일
        </LunchTabTriggerWithLink>
      </LunchTabList>
    </Tabs.Root>
  );
};

const LunchTabSeparator = () => {
  return (
    <Separator
      orientation="vertical"
      width={2}
      height={20}
      backgroundColor={palettes.primary.default}
      style={{ margin: '0 10px' }}
    />
  );
};
