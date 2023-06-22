import { css } from '@emotion/react';
import { AccessibleIcon } from '@radix-ui/react-accessible-icon';

import LogoCharacterSVG from '~/assets/images/logo-character.svg';
import { inlineFlex } from '~/styles/utils';

type LogoCharacterSize = 60;

interface LogoCharacterProps {
  size?: LogoCharacterSize;
}

const LogoCharacter = (props: LogoCharacterProps) => {
  const { size = 60 } = props;
  return (
    <div css={selfCss}>
      <AccessibleIcon label="logo-character">
        <LogoCharacterSVG style={{ height: size }} />
      </AccessibleIcon>
    </div>
  );
};

export default LogoCharacter;

const selfCss = css(inlineFlex());
