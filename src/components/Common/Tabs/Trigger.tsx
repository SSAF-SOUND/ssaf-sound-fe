import type { SerializedStyles } from '@emotion/react';
import type { TabsTriggerProps } from '@radix-ui/react-tabs';

import { css } from '@emotion/react';
import * as Tabs from '@radix-ui/react-tabs';

import {
  colorMix,
  flex,
  fontCss,
  palettes,
  themeColorVars,
} from '~/styles/utils';

export interface TriggerProps extends TabsTriggerProps {
  theme?: TriggerColorProps;
  variant?: TriggerVariantProps;
}

export type TriggerColorProps = 'white' | 'primary' | 'secondary';
export type TriggerVariantProps = 'default' | 'fit';

const Trigger = (props: TriggerProps) => {
  const { children, theme = 'primary', variant = 'default', ...rest } = props;
  return (
    <Tabs.Trigger
      data-theme={theme}
      css={[triggerCss, variantCss[variant]]}
      {...rest}
    >
      {children}
    </Tabs.Trigger>
  );
};

const triggerCss = css(flex('center', 'center', 'row'), fontCss.style.B20, {
  background: 'inherit',
  borderBottom: '2px solid transparent',
  color: palettes.font.blueGrey,
  transition: 'background-color 200ms, color 200ms, border 200ms',
  cursor: 'pointer',
  '&:active, &:focus-visible': {
    backgroundColor: colorMix('10%', palettes.white),
    color: colorMix('80%', themeColorVars.mainColor.var),
  },
  '&[data-state="active"]': {
    borderBottomColor: themeColorVars.mainColor.var,
    color: themeColorVars.mainColor.var,
    zIndex: 2,
  },
});

const variantCss: Record<TriggerVariantProps, SerializedStyles> = {
  default: css({
    width: '100%',
  }),

  fit: css({
    width: 'auto',
  }),
};

export default Trigger;
