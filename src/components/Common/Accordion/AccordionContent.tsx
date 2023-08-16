import type { AccordionContentProps as RadixAccordionContentProps } from '@radix-ui/react-accordion';

import { css, keyframes } from '@emotion/react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { forwardRef } from 'react';

import { accordionTimingFunction } from '~/components/Common/Accordion/utils';

interface AccordionContentProps extends RadixAccordionContentProps {}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  (props, ref) => {
    return <RadixAccordion.Content css={selfCss} ref={ref} {...props} />;
  }
);

AccordionContent.displayName = 'AccordionContent';

export default AccordionContent;

const ACCORDION_CONTENT_HEIGHT = `var(--radix-accordion-content-height)`;

const slideDownAnim = keyframes`
  from {
    height: 0;
  }
  to {
    height: ${ACCORDION_CONTENT_HEIGHT};
  }
`;

const slideUpAnim = keyframes`
  from {
    height: ${ACCORDION_CONTENT_HEIGHT};
  }
  to {
    height: 0;
  }
`;

const slideDownAnimCss = css({
  animation: `${slideDownAnim} 300ms ${accordionTimingFunction}`,
});
const slideUpAnimCss = css({
  animation: `${slideUpAnim} 300ms ${accordionTimingFunction}`,
});

const selfCss = css({
  '&[data-state="open"]': slideDownAnimCss,
  '&[data-state="closed"]': slideUpAnimCss,
  overflow: 'hidden',
});
