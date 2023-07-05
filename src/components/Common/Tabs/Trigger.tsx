import type { SerializedStyles } from '@emotion/react';
import type { TabsTriggerProps } from '@radix-ui/react-tabs';

import { css } from '@emotion/react';
import * as Tabs from '@radix-ui/react-tabs';

import { flex, fontCss, palettes } from '~/styles/utils';

export interface TriggerProps extends TabsTriggerProps {
  color?: TriggerColorProps;
  variant?: TriggerVariantProps;
}

export type TriggerColorProps = 'default' | 'primary' | 'secondary';
export type TriggerVariantProps = 'default' | 'fit';

const Trigger = (props: TriggerProps) => {
  const { children, color = 'default', variant = 'default', ...rest } = props;
  return (
    <Tabs.Trigger
      css={[triggerCss, colorCss[color], variantCss[variant]]}
      {...rest}
    >
      {children}
    </Tabs.Trigger>
  );
};

const triggerCss = css(flex('center', 'center', 'row'), fontCss.style.B20, {
  background: 'inherit',
  '&[data-state="active"]': {
    boxShadow: 'inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor',
  },
  color: palettes.font.blueGrey,
});

const colorCss: Record<TriggerColorProps, SerializedStyles> = {
  primary: css({
    '&[data-state="active"]': {
      color: palettes.primary.default,
    },
  }),
  secondary: css({
    '&[data-state="active"]': {
      color: palettes.secondary.default,
    },
  }),
  default: css({
    '&[data-state="active"]': {
      color: palettes.white,
    },
  }),
};

const variantCss: Record<TriggerVariantProps, SerializedStyles> = {
  default: css({
    width: '100%',
  }),

  fit: css({
    width: 'auto',
  }),
};

export default Trigger;
