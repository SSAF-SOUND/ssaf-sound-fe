import type { Meta, StoryObj } from '@storybook/react';

import { css } from '@emotion/react';

import { Icon } from '~/components/Common';
import { PageLayout } from '~/stories/Layout';
import { flex, palettes } from '~/styles/utils';

import { Accordion } from './index';

const meta: Meta<typeof Accordion> = {
  title: 'System/Accordion',
  component: () => <div />,
  decorators: [
    (Story) => (
      <PageLayout css={{ paddingTop: 20 }}>
        <Story />
      </PageLayout>
    ),
  ],
};

export default meta;

interface AccordionStoryProps {
  accordionType: 'single' | 'multiple';
  collapsible: true;
}

type AccordionStory = StoryObj<AccordionStoryProps>;

export const Example1: AccordionStory = {
  argTypes: {
    accordionType: {
      options: ['single', 'multiple'],
      control: { type: 'radio' },
    },
  },
  args: {
    accordionType: 'single',
    collapsible: true,
  },
  render: (args) => (
    <div>
      <Accordion.Root
        type={args.accordionType}
        css={{ width: 'auto', margin: '0 -10px' }}
        collapsible={args.collapsible}
      >
        <Accordion.Item value="1" css={[accordionThemeCss, accordionItemCss]}>
          <Accordion.Trigger css={accordionTriggerCss}>
            <TriggerInner />
          </Accordion.Trigger>
          <Accordion.Content>
            <ContentInner />
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="2" css={[accordionThemeCss, accordionItemCss]}>
          <Accordion.Trigger css={accordionTriggerCss}>
            <TriggerInner />
          </Accordion.Trigger>
          <Accordion.Content>
            <ContentInner />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  ),
};

export const Example2: AccordionStory = {
  ...Example1,
  render: (args) => {
    return (
      <div>
        <Accordion.Root type={args.accordionType} collapsible>
          <Accordion.Item
            value="1"
            css={[accordionThemeCss, accordionItemCss, accordionRoundedCss]}
          >
            <Accordion.Trigger css={accordionTriggerCss}>
              <TriggerInner />
            </Accordion.Trigger>
            <Accordion.Content>
              <ContentInner />
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item
            value="2"
            css={[accordionThemeCss, accordionItemCss, accordionRoundedCss]}
          >
            <Accordion.Trigger css={accordionTriggerCss}>
              <TriggerInner />
            </Accordion.Trigger>
            <Accordion.Content>
              <ContentInner />
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    );
  },
};

const accordionThemeCss = css({
  background: palettes.background.grey,
  color: palettes.white,
});

const accordionItemCss = css({
  overflow: 'hidden',
  marginBottom: 10,
  ':focus-within': {
    outline: `2px solid ${palettes.primary.default}`,
  },
});

const accordionTriggerCss = css(
  { padding: '0 30px', width: '100%' },
  accordionThemeCss
);

const accordionRoundedCss = css({
  borderRadius: 12,
  overflow: 'hidden',
});

const TriggerInner = () => {
  return (
    <div css={{ padding: '10px 0' }}>
      <div css={flex('center', 'space-between', 'row', 20)}>
        <span>모집 파트 및 인원</span>
        <Icon
          name="chevron.down"
          color="white"
          size={20}
          css={{
            transition: 'transform 200ms',
            '[data-state="open"] &': {
              transform: 'rotate(0.5turn)',
            },
          }}
        />
      </div>
      <div css={flex('center', 'flex-start', 'row')}>
        <span>프론트엔드 6명, 백엔드 6명</span>
      </div>
    </div>
  );
};
const ContentInner = () => {
  const content =
    `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus.`.repeat(
      3
    );
  return <p css={{ padding: '20px 30px' }}>{content}</p>;
};
