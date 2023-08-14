import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { flex } from '~/styles/utils';
import { removeQueryString } from '~/utils';

import { Tabs } from '../Common';

export const RecruitTabs = () => {
  const router = useRouter();

  const { asPath } = router;
  return (
    <Tabs.Root defaultValue="projectInfo">
      <Tabs.List css={listCss}>
        <Tabs.Border css={borderCss} />

        <Tabs.TriggerWithLink
          triggerProps={{
            value: 'projectInfo',
            variant: 'fit',
            css: triggerCss,
          }}
          linkProps={{
            href: {
              pathname: removeQueryString(asPath),
              query: {
                info: 'projectInfo',
              },
            },
          }}
        >
          프로젝트 설명
        </Tabs.TriggerWithLink>
        <Tabs.TriggerWithLink
          triggerProps={{
            value: 'recruitInfo',
            variant: 'fit',
            css: triggerCss,
          }}
          linkProps={{
            href: {
              pathname: removeQueryString(asPath),
              query: {
                info: 'recruitInfo',
              },
            },
          }}
        >
          리쿠르팅 현황
        </Tabs.TriggerWithLink>
      </Tabs.List>
    </Tabs.Root>
  );
};

const listCss = css(flex('', '', 'row', 20));
const triggerCss = css({
  paddingBottom: 5,
});

const borderCss = css({
  width: '100vw',
  marginLeft: '-20px',
});
