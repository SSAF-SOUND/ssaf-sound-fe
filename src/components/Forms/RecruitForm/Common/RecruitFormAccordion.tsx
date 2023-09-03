import type { CSSProperties, ReactNode } from 'react';
import type { IconNames } from '~/components/Common';

import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

import { Icon } from '~/components/Common';
import { Accordion } from '~/components/Common/Accordion';
import { accordionTimingFunction } from '~/components/Common/Accordion/utils';
import { recruitFormExpandCss } from '~/components/Forms/RecruitForm/Common/recruitFormExpandCss';
import { flex, fontCss, palettes } from '~/styles/utils';

interface AccordionRootProps {
  children: ReactNode;
}

const AccordionRoot = (props: AccordionRootProps) => {
  const { children } = props;
  return (
    <Accordion.Root type="multiple" css={accordionRootCss}>
      {children}
    </Accordion.Root>
  );
};

const accordionRootCss = css(flex('', '', 'column', 8));

const accordionThemeCss = css({
  backgroundColor: palettes.background.grey,
  color: palettes.white,
});

interface AccordionItemProps {
  value: string;
  children: ReactNode;
}

const AccordionItem = (props: AccordionItemProps) => {
  const { value, children } = props;
  return (
    <Accordion.Item
      css={[accordionThemeCss, recruitFormExpandCss]}
      value={value}
    >
      {children}
    </Accordion.Item>
  );
};

interface AccordionTriggerProps {
  children: ReactNode;
  titleIconName: IconNames;
  summary?: ReactNode;
  summaryContainerStyle?: CSSProperties;
}

const AccordionTrigger = (props: AccordionTriggerProps) => {
  const { children, titleIconName, summary, summaryContainerStyle } = props;

  return (
    <Accordion.Trigger css={[accordionTriggerSelfCss, accordionThemeCss]}>
      <div css={accordionTriggerRowCss}>
        <div css={accordionTriggerTitleLayerCss}>
          <Icon name={titleIconName} size={24} color={palettes.white} />
          <div>{children}</div>
        </div>
        <Icon className={arrowIconClassname} name="chevron.down" size={24} />
      </div>
      {summary && (
        <div
          css={[accordionTriggerRowCss, summaryCss]}
          style={summaryContainerStyle}
        >
          {summary}
        </div>
      )}
    </Accordion.Trigger>
  );
};

const arrowIconClassname = 'recruit-form-accordion-arrow-icon';

const accordionTriggerSelfCss = css(
  { width: '100%', padding: '6px 25px' },
  fontCss.style.R16
);

const accordionTriggerRowCss = css(
  {
    [`& > .${arrowIconClassname}`]: {
      transition: `transform 300ms ${accordionTimingFunction}`,
    },
    [`[data-state="open"] > & > .${arrowIconClassname}`]: {
      transform: `rotate(0.5turn)`,
    },
  },
  flex('center', 'space-between', 'row', 20)
);

const accordionTriggerTitleLayerCss = css(
  flex('center', 'flex-start', 'row', 8)
);

const summaryCss = css(
  {
    '[data-state="open"] > &': { display: 'none' },
    '[data-state="closed"] > &': { display: '' },
    marginTop: 6,
  },
  fontCss.style.R12
);

interface AccordionContentProps {
  children: ReactNode;
  initiallyForceMountThenUnmountImmediately?: boolean;
}
const AccordionContent = (props: AccordionContentProps) => {
  const { children, initiallyForceMountThenUnmountImmediately = false } = props;

  const [forceMount, setForceMount] = useState(
    initiallyForceMountThenUnmountImmediately
  );

  useEffect(() => {
    setForceMount(false);
  }, []);

  return (
    <Accordion.Content forceMount={forceMount ? true : undefined}>
      <div css={accordionContentCss}>{children}</div>
    </Accordion.Content>
  );
};

const accordionContentCss = css({
  padding: '12px 25px 120px',
});

export const RecruitFormAccordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Content: AccordionContent,
  Trigger: AccordionTrigger,
};
