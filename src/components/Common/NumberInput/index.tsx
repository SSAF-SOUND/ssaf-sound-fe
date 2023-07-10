import type { ComponentPropsWithoutRef, RefObject } from 'react';

import { css } from '@emotion/react';
import { forwardRef, useRef } from 'react';

import { Icon, IconButton } from '~/components/Common';
import { useComposedRefs } from '~/hooks/useComposedRefs';
import { fontCss, inlineFlex, palettes } from '~/styles/utils';

interface NumberInputProps extends ComponentPropsWithoutRef<'input'> {
  onClickMinus?: () => void;
  onClickPlus?: () => void;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (props: NumberInputProps, ref) => {
    const { onClickMinus, onClickPlus, className, ...restProps } = props;
    const ourRef = useRef<HTMLInputElement>(null);
    const composedRefs = useComposedRefs(ref, ourRef);

    return (
      <div css={selfCss} className={className}>
        <IconButton
          css={iconButtonCss}
          size={24}
          onClick={onClickMinus || changeInputAmount(-1, ourRef)}
        >
          <Icon name="minus" size={14} />
        </IconButton>
        <input
          css={[inputCss, hideBrowserStyleCss]}
          {...restProps}
          ref={composedRefs}
          type="number"
        />
        <IconButton
          css={iconButtonCss}
          size={24}
          onClick={onClickPlus || changeInputAmount(1, ourRef)}
        >
          <Icon name="plus" size={14} />
        </IconButton>
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput';

const changeInputAmount =
  (amount: number, ref: RefObject<HTMLInputElement>) => () => {
    if (ref.current) {
      ref.current.valueAsNumber += amount;
    }
  };

export default NumberInput;

const selfCss = css(
  {
    width: 146,
    borderRadius: 4,
    backgroundColor: palettes.font.blueGrey,
    padding: '0 10px',
  },
  inlineFlex('center', '', 'row', 10),
  fontCss.family.auto,
  fontCss.style.R14
);

const inputCss = css({
  width: '100%',
  height: 36,
  outline: 0,
  border: 0,
  padding: 0,
  backgroundColor: palettes.font.blueGrey,
  textAlign: 'center',
  color: palettes.white,
});

const hideBrowserStyleCss = css({
  '::-webkit-outer-spin-button, ::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  MozAppearance: 'textfield',
});

const iconButtonCss = css({
  flexShrink: 0,
});
