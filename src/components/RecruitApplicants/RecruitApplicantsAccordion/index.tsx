import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import { createContext, useContext } from 'react';

import { Accordion } from '~/components/Common/Accordion';
import { RecruitParts } from '~/services/recruit';
import { flex, fontCss, palettes } from '~/styles/utils';

interface AccordionRootProps {
  children: ReactNode;
  isStudy?: boolean;
}

const IsStudyContext = createContext<boolean>(false);
const useIsStudy = () => {
  return useContext(IsStudyContext);
};

const AccordionRoot = (props: AccordionRootProps) => {
  const { children, isStudy = false } = props;
  const accordionValue = isStudy ? [RecruitParts.STUDY] : undefined;

  return (
    <IsStudyContext.Provider value={isStudy}>
      <Accordion.Root
        type="multiple"
        value={accordionValue}
        css={[accordionRootCss]}
      >
        {children}
      </Accordion.Root>
    </IsStudyContext.Provider>
  );
};

const accordionRootCss = css(flex('', '', 'column', 8));

const accordionThemeCss = css({
  backgroundColor: palettes.background.grey,
  color: palettes.white,
});

const studyAccordionThemeCss = css({
  backgroundColor: palettes.background.default,
});

interface AccordionItemProps {
  value: string;
  children: ReactNode;
}

const AccordionItem = (props: AccordionItemProps) => {
  const { value, children } = props;
  const isStudy = useIsStudy();
  const outlineColor = isStudy ? 'transparent' : undefined;

  return (
    <Accordion.Item
      css={[
        accordionThemeCss,
        isStudy && studyAccordionThemeCss,
        accordionItemCss,
      ]}
      outlineColor={outlineColor}
      value={value}
    >
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
  const isStudy = useIsStudy();

  return (
    <Accordion.Trigger
      css={[
        accordionThemeCss,
        isStudy && studyAccordionThemeCss,
        accordionTriggerSelfCss,
        isStudy && studyAccordionTriggerSelfCss,
      ]}
    >
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
const studyAccordionTriggerSelfCss = css({
  paddingLeft: 0,
  paddingRight: 0,
  cursor: 'initial',
});

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
  const isStudy = useIsStudy();

  return (
    <Accordion.Content>
      <div css={[accordionContentCss, isStudy && studyAccordionContentCss]}>
        {children}
      </div>
    </Accordion.Content>
  );
};

const accordionContentCss = css({
  padding: '8px 16px 20px',
});
const studyAccordionContentCss = css({
  paddingLeft: 0,
  paddingRight: 0,
});

export const RecruitApplicantsAccordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Content: AccordionContent,
  Trigger: AccordionTrigger,
};
