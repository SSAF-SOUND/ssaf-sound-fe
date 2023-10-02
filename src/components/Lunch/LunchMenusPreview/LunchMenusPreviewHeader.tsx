import type { LunchDateSpecifier } from '~/services/lunch';

import Link from 'next/link';

import { css } from '@emotion/react';

import { Button } from '~/components/Common/Button';
import { LunchTitle } from '~/components/Lunch/LunchTitle';
import { flex, fontCss, palettes } from '~/styles/utils';
import { routes } from '~/utils';

export interface LunchMenusPreviewHeaderProps {
  className?: string;
  campus: string;
  dateSpecifier: LunchDateSpecifier;
}

export const LunchMenusPreviewHeader = (
  props: LunchMenusPreviewHeaderProps
) => {
  const { campus, dateSpecifier, className } = props;

  return (
    <header css={selfCss} className={className}>
      <div>
        <LunchTitle />
        <span css={campusCss}>{campus} 캠퍼스</span>
      </div>
      <Button
        asChild
        variant="outlined"
        customColor={{
          mainColor: palettes.black,
          mainDarkColor: palettes.black,
          mainLightColor: palettes.black,
        }}
        css={linkCss}
      >
        <Link
          href={routes.lunch.detail({
            campus,
            date: dateSpecifier,
          })}
        >
          투표하기
        </Link>
      </Button>
    </header>
  );
};

const selfCss = css(
  {
    width: '100%',
    padding: '0 10px',
  },
  flex('flex-start', 'space-between', 'row', 16)
);

const campusCss = css({ padding: '0 24px' }, fontCss.style.R14);

const linkCss = css(
  {
    padding: '0 16px',
    color: palettes.black,
    borderRadius: 20,
    border: `1px solid ${palettes.black}`,
    marginTop: 6,
  },
  fontCss.style.B16
);
