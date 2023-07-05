import type { ComponentPropsWithoutRef } from 'react';

import { css } from '@emotion/react';
import { forwardRef, useId } from 'react';

import { Icon } from '~/components/Common';
import { flex, fontCss, palettes } from '~/styles/utils';

type PortfolioLinkInputGroupInputType = 'href' | 'text';

interface PortfolioLinkInputGroupInputProps
  extends ComponentPropsWithoutRef<'input'> {
  inputType: PortfolioLinkInputGroupInputType;
}

const defaultHrefInputPlaceholder = 'URL입력';
const defaultTextInputPlaceholder = 'Link 제목 입력';

const PortfolioLinkInputGroupInput = forwardRef<
  HTMLInputElement,
  PortfolioLinkInputGroupInputProps
>((props, ref) => {
  const {
    inputType,
    className,
    placeholder = inputType === 'href'
      ? defaultHrefInputPlaceholder
      : defaultTextInputPlaceholder,
    ...restProps
  } = props;
  const inputId = useId();
  return (
    <div css={selfCss} className={className}>
      {inputType === 'href' && (
        <label css={labelCss} htmlFor={inputId}>
          <Icon name="link" />
        </label>
      )}
      <input
        placeholder={placeholder}
        css={inputCss}
        id={inputId}
        spellCheck={false}
        {...restProps}
        ref={ref}
      />
    </div>
  );
});

PortfolioLinkInputGroupInput.displayName = 'PortfolioLinkInputGroupInput';

export default PortfolioLinkInputGroupInput;

const selfCss = css(
  {
    backgroundColor: palettes.background.grey,
    color: palettes.font.blueGrey,
    borderRadius: 30,
    overflow: 'hidden',
    padding: '0 8px',
    transition: 'background-color 200ms, width 200ms',
    ':focus-within': {
      backgroundColor: palettes.font.lightGrey,
    },
  },
  flex('center', 'center', 'row', 4)
);

const labelCss = css(flex('center', 'center'));

const inputCss = css(
  {
    minHeight: 28,
    width: '100%',
    height: '100%',
    padding: '0 4px',
    border: 0,
    outline: 0,
    backgroundColor: 'inherit',
    color: palettes.white,
    textAlign: 'center',
    '&:focus': {
      color: palettes.font.grey,
      textAlign: 'left',
    },
    '::placeholder': {
      color: palettes.font.blueGrey,
      textAlign: 'center',
    },
  },
  fontCss.style.B14
);
