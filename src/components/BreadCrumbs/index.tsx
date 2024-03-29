import type { LinkProps } from 'next/link';

import Link from 'next/link';

import { css } from '@emotion/react';
import { Fragment } from 'react';

import { Button } from '~/components/Common/Button';
import { Icon } from '~/components/Common/Icon';
import { flex, fontCss, palettes } from '~/styles/utils';

export interface BreadCrumbsEntry {
  name: string;
  link?: LinkProps['href'];
  active?: boolean;
}

export interface BreadCrumbsProps {
  entries: BreadCrumbsEntry[];
  className?: string;
}

export const BreadCrumbs = (props: BreadCrumbsProps) => {
  const { entries, ...restProps } = props;
  return (
    <div css={selfCss} {...restProps}>
      {entries.map(({ link, name, active }, index) => (
        <Fragment key={index}>
          <Button
            asChild
            variant="literal"
            size="sm"
            css={[linkCss, active && activeLinkCss]}
          >
            {link ? <Link href={link}>{name}</Link> : <span>{name}</span>}
          </Button>
          {index < entries.length - 1 && (
            <Icon name="chevron.right" size={16} />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export const breadcrumbsHeight = 32;

const selfCss = css(
  flex('center', '', 'row', 8),
  {
    padding: `0 25px`,
    backgroundColor: palettes.background.default,
    height: breadcrumbsHeight,
  },
  fontCss.style.R14
);

const linkCss = css({ padding: 0 }, fontCss.style.R14);
const activeLinkCss = css(
  { color: palettes.primary.default },
  fontCss.style.B14
);
