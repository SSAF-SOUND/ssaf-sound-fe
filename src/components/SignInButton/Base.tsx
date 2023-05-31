import type { ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import { css } from '@emotion/react';

import { filter } from '~/styles/utils';

interface BaseProps {
  icon: ReactNode;
  backgroundColor: string;
  textColor: string;
  providerName: string;
  signInUrl: string;
}

const Base = (props: BaseProps) => {
  const { icon, providerName, textColor, backgroundColor } = props;
  const router = useRouter();

  const handleClick = () => {
    // callbackUrl 저장 후 -> 로그인 플로우 완료 후 리다이렉션
    router.push('/auth/callback?code=777777');
  };

  const buttonStyle = {
    color: textColor,
    backgroundColor,
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={buttonStyle}
      css={selfCss}
    >
      <div css={contentCss}>
        <div css={iconContainerCss}>{icon}</div>
        <div>{providerName} 로그인</div>
      </div>
    </button>
  );
};

const iconWidth = 30;

const selfCss = css({
  borderRadius: 24,
  width: '100%',
  height: 50,
  cursor: 'pointer',
  filter: filter.signIn,
});

const contentCss = css({
  position: 'relative',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 40,
  left: -iconWidth,
});

const iconContainerCss = css({
  width: iconWidth,
  height: iconWidth,
  borderRadius: 9999,
});

export default Base;
