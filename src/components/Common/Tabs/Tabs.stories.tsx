import type { TriggerColorProps, TriggerVariantProps } from './Trigger';
import type { Meta } from '@storybook/react';

import Tabs from './index';

type Props = {
  color: TriggerColorProps;
  variant: TriggerVariantProps;
};
export const TabsComponent = (props: Props) => {
  return (
    <Tabs.Root>
      <Tabs.List>
        <Tabs.Trigger value="프로젝트" {...props}>
          프로젝트
        </Tabs.Trigger>
        <Tabs.Trigger value="스터디" {...props}>
          스터디
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
};

const meta: Meta = {
  title: 'Tabs',
  component: TabsComponent,
};

export default meta;
