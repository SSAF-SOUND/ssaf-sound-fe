import type { AccordionContentProps } from '@radix-ui/react-accordion';
import type { Ref } from 'react';

import { css, keyframes } from '@emotion/react';
import * as Accordion from '@radix-ui/react-accordion';
import { forwardRef } from 'react';

import { toCssVar } from '~/styles/utils';

interface ContentProps extends AccordionContentProps {}

const AccordionContent = forwardRef(
  ({ children, ...props }: ContentProps, forwardedRef: Ref<HTMLDivElement>) => (
    <Accordion.Content {...props} ref={forwardedRef} css={contentCss}>
      <div>{children}</div>
    </Accordion.Content>
  )
);

AccordionContent.displayName = 'AccordionContent';

const RADIX_CONTEND_HEIGHT_CONSTANT = `radix-accordion-content-height`;
const heightVar = toCssVar(RADIX_CONTEND_HEIGHT_CONSTANT);

const contentAnimation = {
  slideDown: keyframes`
    from {
        height: 0;
      }
      to {
        height: ${heightVar.var};
      }`,
  slideUp: keyframes`
    from {
      height: ${heightVar.var};
    }
    to {
      height: 0;
    }
  `,
};

const contentCss = css({
  '&[data-state="open"]': {
    animation: `${contentAnimation.slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${contentAnimation.slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
});

export default AccordionContent;
