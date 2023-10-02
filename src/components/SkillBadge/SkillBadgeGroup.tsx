import type { ToggleGroupMultipleProps } from '@radix-ui/react-toggle-group';
import type { Key } from 'react';
import type { SkillName } from '~/services/recruit';

import * as RadixToggleGroup from '@radix-ui/react-toggle-group';

import { Badge } from '~/components/Common/Badge';

import SkillBadge from './index';

export interface ToggleGroupProps
  extends Omit<ToggleGroupMultipleProps, 'type'> {
  items: string[];
  asSkillBadge?: boolean;
}

export const ToggleGroup = (props: ToggleGroupProps) => {
  const { items, asSkillBadge = false, ...restProps } = props;
  return (
    <RadixToggleGroup.Root type="multiple" {...restProps}>
      {items.map((item) => (
        <ToggleGroupItem
          item={item}
          key={item as Key}
          asSkillBadge={asSkillBadge}
        />
      ))}
    </RadixToggleGroup.Root>
  );
};

const ToggleGroupItem = (props: { asSkillBadge: boolean; item: string }) => {
  const { asSkillBadge, item } = props;
  return (
    <RadixToggleGroup.Item asChild value={item}>
      {asSkillBadge ? (
        <SkillBadge name={item as SkillName} />
      ) : (
        <Badge>{item}</Badge>
      )}
    </RadixToggleGroup.Item>
  );
};
