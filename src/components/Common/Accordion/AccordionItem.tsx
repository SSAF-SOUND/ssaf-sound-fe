import type { AccordionItemProps as RadixAccordionItemProps } from '@radix-ui/react-accordion';

import { css } from '@emotion/react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { forwardRef } from 'react';

import { palettes } from '~/styles/utils';

interface AccordionItemProps extends RadixAccordionItemProps {
  outlineColor?: string;
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  (props, ref) => {
    const { outlineColor, style, ...restProps } = props;
    const ourStyle = { ...style, outlineColor };
    return (
      <RadixAccordion.Item
        css={selfCss}
        style={ourStyle}
        {...restProps}
        ref={ref}
      />
    );
  }
);

export default AccordionItem;

const selfCss = css({
  [`&:focus-within`]: {
    outline: `2px solid ${palettes.primary.default}`,
  },
});
