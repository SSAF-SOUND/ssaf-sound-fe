import { css } from '@emotion/react';
import * as Slider from '@radix-ui/react-slider';

import { flex, palettes } from '~/styles/utils';

interface SliderInputProps {
  value?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
  className?: string;
}

const SliderInput = (props: SliderInputProps) => {
  const {
    className,
    defaultValue,
    value = undefined,
    onValueChange,
    step,
    min,
    max,
  } = props;
  return (
    <Slider.Root
      className={className}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      step={step}
      css={selfCss}
    >
      <Slider.Track css={trackCss}>
        <Slider.Range css={rangeCss} />
      </Slider.Track>
      <Slider.Thumb css={thumbCss} />
    </Slider.Root>
  );
};

export default SliderInput;

const selfCss = css(
  {
    width: '100%',
    height: '10px',
    position: 'relative',
    cursor: 'pointer',
  },
  flex('center', '', 'row')
);

const trackCss = css({
  display: 'block',
  position: 'relative',
  backgroundColor: palettes.white,
  width: '100%',
  height: '2px',
});

const rangeCss = css({
  position: 'absolute',
  display: 'block',
  backgroundColor: palettes.white,
  height: '100%',
});

const thumbCss = css({
  cursor: 'pointer',
  display: 'block',
  width: 20,
  height: 20,
  borderRadius: '50%',
  position: 'absolute',
  top: -10,
  left: -10,
  backgroundColor: palettes.white,
  transition: 'transform 200ms',
  ':focus': {
    transform: 'scale(1.3, 1.3)',
  },
});
