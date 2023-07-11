import type { AccordionTriggerProps } from '@radix-ui/react-accordion';
import type { Ref } from 'react';

import { css } from '@emotion/react';
import * as Accordion from '@radix-ui/react-accordion';
import { forwardRef } from 'react';

import { Icon } from '~/components/Common';
import { flex, fontCss, palettes } from '~/styles/utils';

interface TriggerProps extends AccordionTriggerProps {}

const AccordionTrigger = forwardRef(
  (
    { children, ...props }: TriggerProps,
    forwardedRef: Ref<HTMLButtonElement>
  ) => (
    <Accordion.Header>
      <Accordion.Trigger css={triggerCss} {...props} ref={forwardedRef}>
        <div>{children}</div>
        <Icon name="chevron.down" className="AccordionTriggerIcon" />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

AccordionTrigger.displayName = 'AccordionTrigger';

const triggerCss = css(
  {
    background: palettes.background.grey,
    width: '100%',
    padding: '0 30px',
    // padding 추후에 props 방식 또는, 정해진 디자인으로 수정할 예정
    cursor: 'pointer',
    transition: 'transform 300ms',
    '&[data-state="open"] > .AccordionTriggerIcon': {
      transform: 'rotate(180deg)',
    },
  },
  flex('center', 'space-between', 'row'),
  fontCss.style.R16,
  fontCss.family.auto
);

export default AccordionTrigger;
