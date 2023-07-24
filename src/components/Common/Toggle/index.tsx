import { css } from '@emotion/react';
import * as RadixToggle from '@radix-ui/react-toggle';

import { inlineFlex, palettes, themeColorVars } from '~/styles/utils';

type ToggleTheme = 'primary' | 'secondary' | 'recruit';
type ToggleOrder = 'thumb-first' | 'text-first';

export interface ToggleStyleProps {
  thumbSize: number;
  textWidth: number;
  order?: ToggleOrder;
  theme?: ToggleTheme;
  text?: string;
  padding?: string | number;
  borderRadius?: number;
}

export interface ToggleCoreProps {
  id?: string;
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export interface ToggleProps extends ToggleStyleProps, ToggleCoreProps {}

const Toggle = (props: ToggleProps) => {
  const {
    thumbSize,
    textWidth,
    order = 'thumb-first',
    theme = 'primary',
    text,
    padding = 0,
    ...restProps
  } = props;

  const thumbDirection = order === 'thumb-first' ? 1 : -1;
  const textDirection = -1 * thumbDirection;

  return (
    <RadixToggle.Root
      data-theme={theme}
      css={[selfCss, selfSizeCss(thumbSize, textWidth, padding)]}
      {...restProps}
    >
      <span
        css={[thumbCss, thumbSizeCss(thumbSize, textWidth, thumbDirection)]}
      />
      <span css={[textCss, textSizeCss(thumbSize, textWidth, textDirection)]}>
        {text}
      </span>
    </RadixToggle.Root>
  );
};

export default Toggle;

const toggleOn = `[aria-pressed="true"][data-state="on"]`;

const selfSizeCss = (
  thumbSize: number,
  textWidth: number,
  padding: number | string
) =>
  css({
    cursor: 'pointer',
    width: thumbSize + textWidth,
    height: thumbSize,
    padding,
    '&:disabled': {
      opacity: 0.5,
    },
  });

const thumbSizeCss = (
  thumbSize: number,
  textWidth: number,
  direction: number
) =>
  css({
    width: thumbSize,
    height: thumbSize,
    order: direction === 1 ? 0 : 1,
    [`${toggleOn} &`]: {
      transform: `translate3d(${direction * textWidth}px, 0, 0)`,
    },
  });

const textSizeCss = (thumbSize: number, textWidth: number, direction: number) =>
  css({
    width: textWidth,
    order: direction === 1 ? 0 : 1,
    [`${toggleOn} &`]: {
      transform: `translate3d(${direction * thumbSize}px, 0, 0)`,
    },
  });

const selfCss = css(
  {
    /* `content-box`는 의도적으로 설정한 값입니다. `border-box`로 하면 `on`상태일 때와 `off`상태일 때의 엘리먼트-`border`사이의 여백이 일관적이지 않게 됩니다.*/
    boxSizing: 'content-box',
    position: 'relative',
    backgroundColor: 'transparent',
    border: `1px solid ${palettes.font.blueGrey}`,
    borderRadius: 16,
    color: palettes.font.blueGrey,
    padding: 0,
    transition: 'outline 100ms',
    [`&${toggleOn}`]: {
      borderColor: themeColorVars.mainColor.var,
    },
    ':focus-visible': {
      outline: `3px solid ${themeColorVars.mainLightColor.var}`,
    },
  },
  inlineFlex('center', 'flex-start', 'row')
);

const thumbCss = css({
  borderRadius: '50%',
  backgroundColor: palettes.font.blueGrey,
  transition: 'transform 200ms',
  [`${toggleOn} &`]: {
    backgroundColor: themeColorVars.mainColor.var,
  },
});

const textCss = css({
  textAlign: 'center',
  transition: 'transform 200ms',
  [`${toggleOn} &`]: {
    color: themeColorVars.mainColor.var,
  },
});
