import type { ToggleGroupMultipleProps } from '@radix-ui/react-toggle-group';
import type { Key } from 'react';
import type { SkillName } from '~/services/recruit';

import * as RadixToggleGroup from '@radix-ui/react-toggle-group';

import SkillBadge from '~/components/SkillBadge';

import { Badge } from '../Badge';

export interface ToggleGroupProps
  extends Omit<ToggleGroupMultipleProps, 'type'> {
  items: string[];
  asSkillBadge?: boolean;
  theme?: 'primary' | 'secondary';
}

export const ToggleGroup = (props: ToggleGroupProps) => {
  const {
    items,
    asSkillBadge = false,
    theme = 'primary',
    ...restProps
  } = props;
  return (
    <RadixToggleGroup.Root type="multiple" {...restProps}>
      {items.map((item) => (
        <ToggleGroupItem
          theme={theme}
          item={item}
          key={item as Key}
          asSkillBadge={asSkillBadge}
        />
      ))}
    </RadixToggleGroup.Root>
  );
};

const ToggleGroupItem = (props: {
  asSkillBadge: boolean;
  item: string;
  theme: 'primary' | 'secondary';
}) => {
  const { asSkillBadge, theme, item } = props;
  return (
    <RadixToggleGroup.Item asChild value={item}>
      {asSkillBadge ? (
        <SkillBadge name={item as SkillName} theme={theme} />
      ) : (
        <Badge>{item}</Badge>
      )}
    </RadixToggleGroup.Item>
  );
};
