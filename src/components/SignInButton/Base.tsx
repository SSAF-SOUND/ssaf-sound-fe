import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { Button } from '~/components/Common/Button';
import { endpoints } from '~/react-query/common';
import { flex, fontCss, inlineFlex, palettes } from '~/styles/utils';
import { API_URL, composeUrls } from '~/utils';

type Provider = 'google' | 'github' | 'kakao' | 'apple';

interface BaseProps {
  icon?: ReactNode;
  provider: Provider;
  text?: string;
  className?: string;
}

const Base = (props: BaseProps) => {
  const { icon, text, provider, className } = props;

  return (
    <Button asChild variant="outlined" css={selfCss} className={className}>
      <a href={composeUrls(API_URL, endpoints.auth.provider(provider))}>
        <div css={contentCss}>
          {icon && <div css={iconCss}>{icon}</div>}
          {text && <div css={textCss}>{text}</div>}
        </div>
      </a>
    </Button>
  );
};

const selfCss = css(
  {
    width: '100%',
    height: 48,
    cursor: 'pointer',
    backgroundColor: palettes.background.default,
    color: palettes.white,
    border: '1px solid',
    borderColor: palettes.white,
    borderRadius: 40,
  },
  fontCss.family.auto,
  flex('center', 'center', 'row')
);

const contentCss = css(
  { position: 'relative' },
  inlineFlex('center', 'center', 'row', 16)
);

const iconCss = css(flex('center'));

const textCss = css(
  {
    minWidth: 120,
    textAlign: 'left',
  },
  fontCss.style.R16
);

export default Base;
