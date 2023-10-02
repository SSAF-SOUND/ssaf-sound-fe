import type { ReactNode } from 'react';
import type { Theme } from '~/styles/utils';

import { css } from '@emotion/react';

import { Tabs } from '~/components/Common/Tabs';

import { RecruitTabsValue } from './constants';

interface RecruitTabsRootProps {
  children: ReactNode;
  className?: string;
  descriptionText: string;
  theme: Extract<Theme, Theme.PRIMARY | Theme.SECONDARY>;
}

export const RecruitTabsRoot = (props: RecruitTabsRootProps) => {
  const { children, descriptionText, theme, ...restProps } = props;
  return (
    <Tabs.Root defaultValue={RecruitTabsValue.DESCRIPTION} {...restProps}>
      <Tabs.List>
        <Tabs.Trigger
          theme={theme}
          variant="fit"
          css={triggerCss}
          value={RecruitTabsValue.DESCRIPTION}
        >
          {descriptionText}
        </Tabs.Trigger>
        <Tabs.Trigger
          theme={theme}
          variant="fit"
          css={triggerCss}
          value={RecruitTabsValue.PARTICIPANTS_PROGRESS}
        >
          리쿠르팅 현황
        </Tabs.Trigger>
        <Tabs.Border css={borderCss} />
      </Tabs.List>
      {children}
    </Tabs.Root>
  );
};

const borderCss = css({
  width: '150%',
  left: '-25%',
});

const triggerCss = css({
  padding: 10,
});
