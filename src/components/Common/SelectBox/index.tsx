import { css } from '@emotion/react';
import * as Select from '@radix-ui/react-select';

import { fontCss } from '~/styles/utils';

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
}

const defaultTextAs = (item: any) => item;
const defaultValueAs = (item: any) => item;

const SelectBox = <D,>(props: SelectBoxProps<D>) => {
  const {
    items,
    placeholder,
    textAs = defaultTextAs,
    valueAs = defaultValueAs,
    onValueChange,
  } = props;

  return (
    <Select.Root onValueChange={onValueChange}>
      <Select.Trigger css={triggerCss}>
        <Select.Value placeholder={placeholder} />
        <Select.Icon css={triggerIconCss} />
      </Select.Trigger>
      <Select.Content css={contentCss} position="popper" sideOffset={5}>
        <Select.Viewport css={viewportCss}>
          {items.map((item) => {
            const value = valueAs(item);
            const text = textAs(item);
            return (
              <Select.Item key={value} value={value} css={itemCss}>
                <Select.ItemText>{text}</Select.ItemText>
              </Select.Item>
            );
          })}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
};

const triggerCss = css(fontCss.family.auto, {
  position: 'relative',
  width: '100%',
  backgroundColor: '#FFFFFF',
  border: '2px solid #bbb',
  borderRadius: 8,
  height: 50,
  fontSize: 18,
});

const triggerIconCss = css({
  position: 'absolute',
  transform: 'translate3d(0, -50%, 0)',
  top: '50%',
  color: '#D9D9D9',
  fontSize: 20,
  right: 10,
});

const contentCss = css({
  width: 'var(--radix-select-trigger-width)',
  maxHeight: 'var(--radix-select-content-available-height)',
});

const viewportCss = css({
  border: '2px solid #ccc',
  borderRadius: 8,
  fontSize: 18,
  fontWeight: 700,
  backgroundColor: '#FFFFFF',
});

const itemCss = css(fontCss.family.auto, {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: 50,
  padding: '0 50px',
  '& + &': { borderTop: '1px solid #ccc' },
  backgroundColor: '#FFFFFF',
  ':focus': {
    outline: 0,
    background: '#F0F7FF',
  },
});

export default SelectBox;
