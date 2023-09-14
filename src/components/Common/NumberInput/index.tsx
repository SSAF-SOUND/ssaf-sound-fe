import type { ComponentPropsWithoutRef, MouseEvent } from 'react';

import { css } from '@emotion/react';
import { forwardRef, memo, useRef } from 'react';

import { Icon, IconButton } from '~/components/Common';
import { useComposedRefs } from '~/hooks/useComposedRefs';
import { fontCss, inlineFlex, palettes } from '~/styles/utils';

type ChangeInputAmountHandler = (
  e: MouseEvent<HTMLButtonElement>,
  inputNode: HTMLInputElement
) => void;

export interface NumberInputProps extends ComponentPropsWithoutRef<'input'> {
  onClickMinus?: ChangeInputAmountHandler;
  onClickPlus?: ChangeInputAmountHandler;
}

export const NumberInput = memo(
  forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => {
    const {
      onClickMinus,
      onClickPlus,
      className,
      value,
      max,
      min,
      step,
      ...restProps
    } = props;
    const ourRef = useRef<HTMLInputElement>(null);
    const composedRefs = useComposedRefs(ref, ourRef);

    const handleClickMinus = (e: MouseEvent<HTMLButtonElement>) => {
      const $input = ourRef.current;
      if (!$input) return;
      if (onClickMinus) {
        onClickMinus(e, $input);
        return;
      }
      if (value !== undefined) return;
      $input.valueAsNumber = Math.max(
        $input.valueAsNumber - (Number(step) || 1),
        Number(min || -Infinity)
      );
    };

    const handleClickPlus = (e: MouseEvent<HTMLButtonElement>) => {
      const $input = ourRef.current;
      if (!$input) return;
      if (onClickPlus) {
        onClickPlus(e, $input);
        return;
      }
      if (value !== undefined) return;
      $input.valueAsNumber = Math.min(
        $input.valueAsNumber + (Number(step) || 1),
        Number(max || Infinity)
      );
    };

    return (
      <div css={selfCss} className={className}>
        <IconButton css={iconButtonCss} size={24} onClick={handleClickMinus}>
          <Icon name="minus" size={14} />
        </IconButton>
        <input
          css={[inputCss, hideBrowserStyleCss]}
          {...restProps}
          ref={composedRefs}
          value={value}
          max={max}
          min={min}
          step={step}
          type="number"
        />
        <IconButton css={iconButtonCss} size={24} onClick={handleClickPlus}>
          <Icon name="plus" size={14} />
        </IconButton>
      </div>
    );
  })
);

NumberInput.displayName = 'NumberInput';

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
