import type { AccordionTriggerProps as RadixAccordionTriggerProps } from '@radix-ui/react-accordion';

import { css } from '@emotion/react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { forwardRef } from 'react';

interface AccordionTriggerProps extends RadixAccordionTriggerProps {}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  (props, ref) => {
    return (
      <RadixAccordion.Header>
        <RadixAccordion.Trigger ref={ref} css={selfCss} {...props} />
      </RadixAccordion.Header>
    );
  }
);

AccordionTrigger.displayName = 'AccordionTrigger';
const selfCss = css({ cursor: 'pointer' });

export default AccordionTrigger;
