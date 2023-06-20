import type { CSSProperties } from 'react';

import { css } from '@emotion/react';
import { AccessibleIcon } from '@radix-ui/react-accessible-icon';

import LogoCharacterSVG from '~/assets/images/logo-character.svg';
import { inlineFlex } from '~/styles/utils';

type LogoCharacterSize = 60;

interface LogoCharacterProps {
  size?: LogoCharacterSize;
  style?: CSSProperties;
}

const LogoCharacter = (props: LogoCharacterProps) => {
  const { size = 60, style = {} } = props;
  return (
    <div css={selfCss} style={{ height: size, ...style }}>
      <AccessibleIcon label="logo-character">
        <LogoCharacterSVG />
      </AccessibleIcon>
    </div>
  );
};

export default LogoCharacter;

const selfCss = css(inlineFlex());
