import type { ToggleGroupMultipleProps } from '@radix-ui/react-toggle-group';
import type { SkillType } from '~/services/recruit';

import * as ToggleGroup from '@radix-ui/react-toggle-group';

import SkillBadge from './index';

export interface SkillBadgeGroupProps
  extends Omit<ToggleGroupMultipleProps, 'type'> {
  items: SkillType[];
}

export const SkillBadgeGroup = (props: SkillBadgeGroupProps) => {
  const { items = ['React', 'NextJs'], ...restProps } = props;
  return (
    <ToggleGroup.Root type="multiple" {...restProps}>
      {items.map((item) => (
        <SkillBadgeGroupItem name={item} key={item} />
      ))}
    </ToggleGroup.Root>
  );
};

const SkillBadgeGroupItem = (props: { name: SkillType }) => {
  return (
    <ToggleGroup.Item asChild value={props.name}>
      <SkillBadge name={props.name} />
    </ToggleGroup.Item>
  );
};
