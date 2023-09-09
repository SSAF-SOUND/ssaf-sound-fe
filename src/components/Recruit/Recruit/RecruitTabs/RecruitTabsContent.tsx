
import { css } from '@emotion/react';

import ArticleContent from '~/components/Article/ArticleContent';
import { Tabs } from '~/components/Common';

import { RecruitTabsValue } from './constants';
import {
  RecruitParticipantsProgressDetail
} from "./RecruitParticipantsProgressDetail";

interface RecruitTabsDescriptionContentProps {
  html: string;
}

export const RecruitTabsDescriptionContent = (
  props: RecruitTabsDescriptionContentProps
) => {
  const { html } = props;
  return (
    <Tabs.Content css={selfCss} value={RecruitTabsValue.DESCRIPTION} {...props}>
      <ArticleContent html={html} />
    </Tabs.Content>
  );
};

interface RecruitTabsParticipantsProgressContentProps {
  recruitId: number;
}

export const RecruitTabsParticipantsProgressContent = (
  props: RecruitTabsParticipantsProgressContentProps
) => {
  const { recruitId } = props;

  return (
    <Tabs.Content css={selfCss} value={RecruitTabsValue.PARTICIPANTS_PROGRESS}>
      <RecruitParticipantsProgressDetail recruitId={recruitId} />
    </Tabs.Content>
  );
};

const selfCss = css({
  padding: '20px 0',
});
