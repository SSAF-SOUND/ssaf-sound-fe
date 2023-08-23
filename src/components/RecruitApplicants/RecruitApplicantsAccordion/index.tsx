import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { Accordion } from '~/components/Common';
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
    <Accordion.Item css={[accordionThemeCss, accordionItemCss]} value={value}>
      {children}
    </Accordion.Item>
  );
};

const accordionItemCss = css({
  borderRadius: 8,
  overflow: 'hidden',
});

interface AccordionTriggerProps {
  children: ReactNode;
  applicantsCount: number;
}

const AccordionTrigger = (props: AccordionTriggerProps) => {
  const { children, applicantsCount } = props;

  return (
    <Accordion.Trigger css={[accordionTriggerSelfCss, accordionThemeCss]}>
      <span css={accordionTriggerTitleCss}>{children}</span>
      <div css={applicantsCountContainerCss}>
        <span>리쿠르팅 신청</span>
        <strong css={applicantsCountHighlightCss}>{applicantsCount}</strong>
      </div>
    </Accordion.Trigger>
  );
};

const accordionTriggerSelfCss = css(
  { width: '100%', padding: '10px 16px' },
  flex('center', 'space-between', 'row', 20)
);

const accordionTriggerTitleCss = css(
  {
    transition: 'font-size 200ms, color 200ms',
    color: palettes.font.blueGrey,
    '[data-state="open"] > &': [{ color: palettes.white }, fontCss.style.B28],
  },
  fontCss.style.B20
);

const applicantsCountContainerCss = css(
  {
    '[data-state="open"] > &': { display: 'none' },
    '[data-state="closed"] > &': { display: '' },
  },
  flex('flex-end', 'flex-start', 'row', 4),
  fontCss.style.B14
);

const applicantsCountHighlightCss = css(
  { color: palettes.recruit.default },
  fontCss.style.B18
);

interface AccordionContentProps {
  children: ReactNode;
}
const AccordionContent = (props: AccordionContentProps) => {
  const { children } = props;

  return (
    <Accordion.Content>
      <div css={accordionContentCss}>{children}</div>
    </Accordion.Content>
  );
};

const accordionContentCss = css({
  padding: '8px 16px 20px',
});

export const RecruitApplicantsAccordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Content: AccordionContent,
  Trigger: AccordionTrigger,
};
