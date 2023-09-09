import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { Tabs } from '~/components/Common';

import { RecruitTabsValue } from './constants';

interface RecruitTabsContentProps {
  children: ReactNode;
}

export const RecruitTabsDescriptionContent = (
  props: RecruitTabsContentProps
) => {
  return (
    <Tabs.Content
      css={selfCss}
      value={RecruitTabsValue.DESCRIPTION}
      {...props}
    />
  );
};

export const RecruitTabsParticipantsProgressContent = (
  props: RecruitTabsContentProps
) => {
  return (
    <Tabs.Content
      css={selfCss}
      value={RecruitTabsValue.PARTICIPANTS_PROGRESS}
      {...props}
    />
  );
};

const selfCss = css({
  padding: '20px 0',
});
