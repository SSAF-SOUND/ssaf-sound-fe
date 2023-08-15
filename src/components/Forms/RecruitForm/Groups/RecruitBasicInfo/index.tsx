import type { ReactNode } from 'react';
import type { IconNames } from '~/components/Common';
import type { RecruitFormValues } from '~/components/Forms/RecruitForm/utils';

import { css } from '@emotion/react';
import { useWatch } from 'react-hook-form';

import { Accordion, Icon } from '~/components/Common';
import FieldOverview from '~/components/Forms/RecruitForm/Common/FieldOverview';
import {
  EndDate,
  Participants,
  Skills,
} from '~/components/Forms/RecruitForm/Fields';
import { RecruitCategoryName } from '~/components/Forms/RecruitForm/utils';
import { flex, fontCss, palettes } from '~/styles/utils';

interface RecruitBasicInfoProps {
  className?: string;
}

export const RecruitBasicInfo = (props: RecruitBasicInfoProps) => {
  return (
    <div {...props}>
      <FieldOverview>리쿠르팅 기본 정보</FieldOverview>

      <Accordion.Root type="multiple" css={accordionRootCss}>
        <ParticipantsLayer />

        <EndDateLayer />

        <SkillsLayer />
      </Accordion.Root>
    </div>
  );
};

const participantsFieldName = 'participants';
const categoryFieldName = 'category';
const ParticipantsLayer = () => {
  const { project, study } =
    (useWatch<RecruitFormValues>({
      name: participantsFieldName,
    }) as RecruitFormValues['participants']) || {};

  const category = useWatch<RecruitFormValues>({
    name: categoryFieldName,
  }) as RecruitFormValues['category'];

  const targetParticipants =
    category === RecruitCategoryName.PROJECT ? project : study;

  const summary = targetParticipants
    .filter(({ part }) => !!part)
    .map(({ part, count }) => `${part} ${count}명`)
    .join(', ');

  return (
    <AccordionItem value="모집 인원">
      <AccordionTrigger titleIconName="group" summary={summary}>
        모집 인원
      </AccordionTrigger>
      <AccordionContent>
        <Participants />
      </AccordionContent>
    </AccordionItem>
  );
};

const endDateFieldName = 'endDate';

const EndDateLayer = () => {
  const endDate = useWatch<RecruitFormValues>({
    name: endDateFieldName,
  }) as RecruitFormValues['endDate'];

  return (
    <AccordionItem value="모집 마감일 선택">
      <AccordionTrigger titleIconName="calendar" summary={endDate}>
        모집 마감일 선택
      </AccordionTrigger>
      <AccordionContent>
        <EndDate />
      </AccordionContent>
    </AccordionItem>
  );
};

const SkillsLayer = () => {
  return (
    <AccordionItem value="기술 스택">
      <AccordionTrigger titleIconName="board">기술 스택</AccordionTrigger>
      <AccordionContent>
        <Skills />
      </AccordionContent>
    </AccordionItem>
  );
};

//

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
      css={[accordionItemSelfCss, accordionThemeCss]}
      value={value}
    >
      {children}
    </Accordion.Item>
  );
};

const accordionItemSelfCss = css({
  '&:focus-within': {
    outline: `2px solid ${palettes.primary.default}`,
  },
});

interface AccordionTriggerProps {
  children: ReactNode;
  titleIconName: IconNames;
  summary?: ReactNode;
}

const AccordionTrigger = (props: AccordionTriggerProps) => {
  const { children, titleIconName, summary } = props;
  return (
    <Accordion.Trigger css={[accordionTriggerSelfCss, accordionThemeCss]}>
      <div css={accordionTriggerRowCss}>
        <div css={accordionTriggerTitleLayerCss}>
          <Icon name={titleIconName} size={24} color={palettes.white} />
          <div>{children}</div>
        </div>
        <Icon name="chevron.down" size={24} />
      </div>
      {summary && (
        <div css={[accordionTriggerRowCss, summaryCss]}>{summary}</div>
      )}
    </Accordion.Trigger>
  );
};

const accordionTriggerSelfCss = css(
  { width: '100%', padding: '6px 25px' },
  fontCss.style.R16
);

const accordionTriggerRowCss = css(flex('center', 'space-between', 'row', 20));

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
  padding: '12px 25px 120px',
});
