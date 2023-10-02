import type { RecruitDetail } from '~/services/recruit';

import { css } from '@emotion/react';

import ArticleContent from '~/components/Article/ArticleContent';
import { Tabs } from '~/components/Common/Tabs';

import { RecruitTabsValue } from './constants';
import { RecruitParticipantsProgressDetail } from './RecruitParticipantsProgressDetail';

interface RecruitTabsDescriptionContentProps {
  html: string;
}

export const RecruitTabsDescriptionContent = (
  props: RecruitTabsDescriptionContentProps
) => {
  const { html, ...restProps } = props;
  return (
    <Tabs.Content
      css={selfCss}
      value={RecruitTabsValue.DESCRIPTION}
      {...restProps}
    >
      <ArticleContent html={html} />
    </Tabs.Content>
  );
};

interface RecruitTabsParticipantsProgressContentProps {
  recruitId: number;
  recruitDetail: RecruitDetail;
}

export const RecruitTabsParticipantsProgressContent = (
  props: RecruitTabsParticipantsProgressContentProps
) => {
  const { recruitId, recruitDetail } = props;

  return (
    <Tabs.Content css={selfCss} value={RecruitTabsValue.PARTICIPANTS_PROGRESS}>
      <RecruitParticipantsProgressDetail
        recruitDetail={recruitDetail}
        recruitId={recruitId}
      />
    </Tabs.Content>
  );
};

const selfCss = css({
  padding: '20px 0',
});
