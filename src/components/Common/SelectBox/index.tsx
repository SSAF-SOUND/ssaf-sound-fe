import { css } from '@emotion/react';
import * as Select from '@radix-ui/react-select';

import { flex, fontCss, palettes } from '~/styles/utils';
import { themeColorVars } from '~/styles/utils/themeColorVars';

type TextAlign = 'center' | 'left';
type SelectBoxSize = 'sm' | 'md' | 'lg';
type SelectBoxVariant = 'normal' | 'outlined';
type SelectBoxTheme = 'primary' | 'secondary';

interface SelectBoxProps<D = string> {
  items: D[];
  /**
   * - item을 유저에게 보여줄 text로 변환하는 함수
   *
   * @default (item) => item
   */
  textAs?: (item: D) => string;
  /**
   * - item을 item의 value로 변환하는 함수
   * - value로 변환된 값이 `key`로 사용됨
   *
   * @default (item) => item
   */
  valueAs?: (item: D) => string;
  /**
   * 아무것도 선택되지 않았을 때 Trigger Button에 보여줄 값
   */
  placeholder?: string;
  onValueChange?: (value: string) => void;
  //
  triggerTextAlign?: TextAlign;
  itemTextAlign?: TextAlign;
  size?: SelectBoxSize;
  variant?: SelectBoxVariant;
  theme?: SelectBoxTheme;
  id?: string;
}

// eslint-disable-next-line
const defaultTextAs = (item: any) => item;
// eslint-disable-next-line
const defaultValueAs = (item: any) => item;
const SelectBox = <D,>(props: SelectBoxProps<D>) => {
  const {
    items,
    placeholder,
    textAs = defaultTextAs,
    valueAs = defaultValueAs,
    onValueChange,
    //
    triggerTextAlign = 'left',
    itemTextAlign = 'left',
    size = 'sm',
    variant = 'normal',
    theme = 'primary',
    //
    id,
  } = props;

  return (
    <Select.Root onValueChange={onValueChange}>
      <Select.Trigger
        id={id}
        css={[
          baseTriggerCss,
          triggerCss[variant],
          paddingCss[variant],
          textAlignCss[triggerTextAlign],
          sizeCss[size],
        ]}
        data-theme={theme}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon
          css={[baseTriggerIconCss, triggerIconCss[variant], iconSizeCss[size]]}
        />
      </Select.Trigger>
      <Select.Content
        css={contentCss}
        position="popper"
        sideOffset={5}
        data-theme={theme}
      >
        <Select.Viewport css={viewportCss[variant]}>
          {items.map((item) => {
            const value = valueAs(item);
            const text = textAs(item);
            return (
              <Select.Item
                key={value}
                value={value}
                css={[
                  itemCss[variant],
                  paddingCss[variant],
                  sizeCss[size],
                  itemTextAlignCss[itemTextAlign],
                ]}
              >
                <Select.ItemText>{text}</Select.ItemText>
              </Select.Item>
            );
          })}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
};

export default SelectBox;

const baseTriggerCss = css(
  {
    width: '100%',
    position: 'relative',
  },
  fontCss.family.auto
);

const triggerCss = {
  normal: css({
    backgroundColor: palettes.white,
    borderRadius: 8,
    ':focus': {
      outline: `3px solid ${themeColorVars.mainColor.var}`,
    },
  }),
  outlined: css({
    backgroundColor: 'transparent',
    border: `1px solid ${themeColorVars.mainColor.var}`,
    color: themeColorVars.mainColor.var,
    borderRadius: 16,
    ':focus': {
      outline: `3px solid ${themeColorVars.mainLightColor.var}`,
    },
  }),
};

const baseTriggerIconCss = css({
  userSelect: 'none',
  position: 'absolute',
  transform: 'translate3d(0, -50%, 0)',
  top: '50%',
  color: themeColorVars.mainDarkColor.var,
  transition: 'transform 200ms',
  '[data-state="open"] &': {
    transform: 'translate3d(0, -50%, 0) rotate(180deg)',
  },
});

const triggerIconCss = {
  normal: css({
    right: 20,
  }),
  outlined: css({
    right: 20,
  }),
};

const contentCss = css(
  {
    width: 'var(--radix-select-trigger-width)',
    maxHeight: 'var(--radix-select-content-available-height)',
  },
  fontCss.family.auto
);

const viewportCss = {
  normal: css({
    borderRadius: 8,
    backgroundColor: palettes.white,
  }),
  outlined: css({
    borderRadius: 16,
    border: `1px solid ${themeColorVars.mainColor.var}`,
  }),
};

const itemCss = {
  normal: css({
    width: '100%',
    backgroundColor: palettes.white,
    color: palettes.black,
    '& + &': { borderTop: `1px solid ${palettes.grey3}` },
    ':focus': {
      outline: 0,
      backgroundColor: themeColorVars.mainLightColor.var,
    },
  }),
  outlined: css({
    width: '100%',
    color: palettes.font.blueGrey,
    ':focus': {
      outline: 0,
      color: themeColorVars.mainColor.var,
    },
  }),
};

const paddingCss = {
  normal: css({
    padding: '0 30px',
  }),
  outlined: css({
    padding: '0px 16px',
  }),
};

const textAlignCss = {
  left: css({ textAlign: 'left' }),
  center: css({ textAlign: 'center' }),
};

const itemTextAlignCss = {
  left: css(flex('center', 'start', 'row')),
  center: css(flex('center', 'center', 'row')),
};

const sizeCss = {
  sm: css({ height: 30 }, fontCss.style.B12),
  md: css({ height: 38 }, fontCss.style.R14),
  lg: css({ height: 44 }, fontCss.style.R16),
};

const iconSizeCss = {
  sm: css({ fontSize: 16 }),
  md: css({ fontSize: 18 }),
  lg: css({ fontSize: 20 }),
};
