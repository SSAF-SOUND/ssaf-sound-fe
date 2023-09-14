import type { Theme } from '~/styles/utils';

import { css } from '@emotion/react';

import { Checkbox } from '~/components/Common';
import { flex, fontCss, palettes } from '~/styles/utils';

interface AgreeToProvideProfileCheckboxProps {
  readonly?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (value: boolean) => void;
  className?: string;
  theme: Theme.PRIMARY | Theme.SECONDARY;
}

export const AgreeToProvideProfileCheckbox = (
  props: AgreeToProvideProfileCheckboxProps
) => {
  const { onCheckedChange, defaultChecked, className, readonly, theme } = props;
  return (
    <label css={[selfCss, readonly && readonlyCss]} className={className}>
      <span>동의합니다.</span>
      <Checkbox
        size={28}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        theme={theme}
        disabled={readonly}
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
const readonlyCss = css({
  backgroundColor: palettes.background.grey,
  color: palettes.white,
  pointerEvents: 'none',
  userSelect: 'none',
});
