import { css } from '@emotion/react';
import * as Select from '@radix-ui/react-select';
import { useEffect, useRef } from 'react';

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
  triggerPaddingX?: number;
  itemPaddingX?: number;
  //
  id?: string;
  focusOnMount?: boolean;
  className?: string;
  value?: string;
  defaultValue?: string;
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
    triggerPaddingX = undefined,
    itemPaddingX = undefined,
    //
    id,
    focusOnMount = false,
    className,
    value,
    defaultValue,
  } = props;

  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (focusOnMount) triggerRef.current?.focus();

    // eslint-disable-next-line
  }, []);

  return (
    <Select.Root
      onValueChange={onValueChange}
      value={value}
      defaultValue={defaultValue}
    >
      <Select.Trigger
        id={id}
        ref={triggerRef}
        css={[
          baseTriggerCss,
          triggerCss[variant],
          paddingCss[variant],
          textAlignCss[triggerTextAlign],
          sizeCss[size],
        ]}
        className={className}
        data-theme={theme}
        style={{ paddingLeft: triggerPaddingX, paddingRight: triggerPaddingX }}
      >
        <div css={valueCss}>
          <Select.Value placeholder={placeholder} />
        </div>
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
                style={{
                  paddingLeft: itemPaddingX,
                  paddingRight: itemPaddingX,
                }}
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
  flex('center', 'flex-start', 'row'),
  fontCss.family.auto
);

const triggerCss = {
  normal: css({
    backgroundColor: palettes.white,
    borderRadius: 8,
    '&:focus-visible': {
      outline: `3px solid ${themeColorVars.mainColor.var}`,
    },
  }),
  outlined: css({
    backgroundColor: 'transparent',
    border: `1px solid ${themeColorVars.mainColor.var}`,
    color: themeColorVars.mainColor.var,
    borderRadius: 16,
    '&:focus-visible': {
      outline: `3px solid ${themeColorVars.mainLightColor.var}`,
    },
  }),
};

const valueCss = css({
  flexGrow: 1,
});

const baseTriggerIconCss = css({
  userSelect: 'none',
  color: themeColorVars.mainDarkColor.var,
  transition: 'transform 200ms',
  '[data-state="open"] &': {
    transform: 'rotate(180deg)',
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
    border: `1px solid ${palettes.grey3}`,
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
    '&:focus': {
      outline: 0,
      backgroundColor: themeColorVars.mainLightColor.var,
    },
  }),
  outlined: css({
    width: '100%',
    color: palettes.font.blueGrey,
    '&:focus': {
      outline: 0,
      color: themeColorVars.mainColor.var,
    },
  }),
};

const paddingCss = {
  normal: css({
    padding: '0 20px',
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
  md: css({ height: 36 }, fontCss.style.R14),
  lg: css({ height: 44 }, fontCss.style.R16),
};

const iconSizeCss = {
  sm: css({ fontSize: 16 }),
  md: css({ fontSize: 18 }),
  lg: css({ fontSize: 20 }),
};
