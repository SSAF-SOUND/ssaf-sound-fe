import type { CSSProperties } from 'react';

import { css } from '@emotion/react';
import { AccessibleIcon } from '@radix-ui/react-accessible-icon';

import LogoCharacterSVG from '~/assets/images/logo-character.svg';
import { inlineFlex } from '~/styles/utils';

type LogoCharacterSize = 60 | number;

interface LogoCharacterProps {
  size?: LogoCharacterSize;
  className?: string;
  style?: CSSProperties;
}

const LogoCharacter = (props: LogoCharacterProps) => {
  const { size = 60, ...restProps } = props;
  return (
    <div css={selfCss} {...restProps}>
      <AccessibleIcon label="logo-character">
        <LogoCharacterSVG style={{ height: size }} />
      </AccessibleIcon>
    </div>
  );
};

export default LogoCharacter;

const selfCss = css(inlineFlex());
