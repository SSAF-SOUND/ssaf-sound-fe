import type { SerializedStyles } from '@emotion/react';
import type { TabsTriggerProps } from '@radix-ui/react-tabs';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import * as Tabs from '@radix-ui/react-tabs';

import { fontCss, palettes, resetStyle } from '~/styles/utils';

export const LunchTabTriggerWithLink = (props: TabsTriggerProps) => {
  const router = useRouter();
  const { pathname, query } = router;
  const { date } = query;
  const { value, children, ...restProps } = props;

  const selected = date === value ? 'selected' : 'notSelected';

  return (
    <Tabs.Trigger
      value={value}
      css={[triggerCss, [TriggerHighLightCss[selected]]]}
      asChild
      {...restProps}
    >
      <Link
        href={{
          pathname,
          query: {
            ...router.query,
            date: value,
          },
        }}
      >
        {children}
      </Link>
    </Tabs.Trigger>
  );
};

const triggerCss = css(
  resetStyle.button(),
  fontCss.family.auto,
  fontCss.style.R24,
  {
    cursor: 'pointer',
  }
);

const TriggerHighLightCss: Record<
  'selected' | 'notSelected',
  SerializedStyles
> = {
  selected: css({
    color: palettes.primary.default,
  }),
  notSelected: css({
    color: palettes.font.blueGrey,
  }),
};
