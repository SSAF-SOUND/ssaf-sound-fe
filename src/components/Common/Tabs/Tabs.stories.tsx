import type { TriggerColorProps, TriggerVariantProps } from './Trigger';
import type { Meta } from '@storybook/react';

import Tabs from './index';

type Props = {
  theme: TriggerColorProps;
  variant: TriggerVariantProps;
};

export const TabsComponent = (props: Props) => {
  const { theme, ...rest } = props;
  return (
    <Tabs.Root defaultValue="프로젝트">
      <Tabs.List>
        <Tabs.Trigger value="프로젝트" data-theme={theme} {...rest}>
          프로젝트
        </Tabs.Trigger>
        <Tabs.Trigger value="스터디" data-theme={theme} {...rest}>
          스터디
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="프로젝트">프로젝트 컨텐츠</Tabs.Content>
      <Tabs.Content value="스터디">스터디 컨텐츠</Tabs.Content>
    </Tabs.Root>
  );
};

const meta: Meta = {
  title: 'Tabs',
  component: TabsComponent,
};

export default meta;
