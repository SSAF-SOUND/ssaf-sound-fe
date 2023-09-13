import type { Theme } from '~/styles/utils';

import { css } from '@emotion/react';

import { Checkbox } from '~/components/Common';
import { flex, fontCss, palettes } from '~/styles/utils';

interface AgreeToProvideProfileCheckboxProps {
  checked?: boolean;
  onCheckedChange?: (value: boolean) => void;
  className?: string;
  theme: Theme.PRIMARY | Theme.SECONDARY;
}

export const AgreeToProvideProfileCheckbox = (
  props: AgreeToProvideProfileCheckboxProps
) => {
  const { onCheckedChange, checked, className, theme } = props;
  return (
    <label css={selfCss} className={className}>
      <span>동의합니다.</span>
      <Checkbox
        size={28}
        checked={checked}
        onCheckedChange={onCheckedChange}
        theme={theme}
      />
    </label>
  );
};

const selfCss = css(
  {
    padding: '0 24px',
    cursor: 'pointer',
    color: palettes.black,
    height: 48,
    backgroundColor: palettes.white,
    borderRadius: 8,
  },
  fontCss.style.R14,
  flex('center', 'space-between', 'row', 24)
);
