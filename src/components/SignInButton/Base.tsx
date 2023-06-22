import type { MouseEventHandler, ReactNode } from 'react';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { flex, fontCss, inlineFlex, palettes } from '~/styles/utils';

type Provider = 'google' | 'github' | 'kakao' | 'apple';

interface BaseProps {
  icon: ReactNode;
  provider: Provider;
  text: string;
}

const Base = (props: BaseProps) => {
  const { icon, text, provider } = props;
  const router = useRouter();

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    /**
     * LATER
     *   window.location.href = 'https://api.ssafsound.com/auth/google';
     */
    // callbackUrl 저장 후 -> 로그인 플로우 완료 후 리다이렉션
    router.push('/auth/callback?code=777777');
  };

  return (
    <a onClick={handleClick} css={selfCss}>
      <div css={contentCss}>
        <div css={iconCss}>{icon}</div>
        <div css={textCss}>{text}</div>
      </div>
    </a>
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
