import { css } from '@emotion/react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';

import { Icon } from '~/components/Common/Icon';
import { palettes } from '~/styles/utils';

interface CheckboxProps {
  id?: string;
  className?: string;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}

const SkillOptionsVisibilityToggle = (props: CheckboxProps) => {
  const { className, checked, id, onCheckedChange } = props;
  return (
    <RadixCheckbox.Root
      css={[selfCss, checked && checkedCss]}
      className={className}
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
    >
      <RadixCheckbox.Indicator forceMount>
        {checked ? (
          <Icon name="check" size={30} color={palettes.font.grey} />
        ) : (
          <Icon name="plus" size={30} />
        )}
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
};

export default SkillOptionsVisibilityToggle;

const indicatorSize = 60;

const selfCss = css({
  cursor: 'pointer',
  width: indicatorSize,
  height: indicatorSize,
  borderRadius: '50%',
  padding: 0,
  color: palettes.recruit.default,
  backgroundColor: palettes.background.default,
  border: `1.5px solid ${palettes.font.blueGrey}`,
});

const checkedCss = css({
  color: 'transparent',
  backgroundColor: palettes.recruit.default,
});
