import type { InfoType, ProjectInfoIds } from './utils';
import type { IconNames } from '../Common/Icon';
import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { flex, fontCss, inlineFlex, palettes } from '~/styles/utils';

import { Icon } from '../Common';

interface InfoProps {
  icon: IconNames;
  title: InfoType;
  id: ProjectInfoIds;
  children: ReactNode;
}

const Info = (props: InfoProps) => {
  const { icon, title, id, children } = props;
  return (
    <div css={selfCss}>
      <span css={titleBoxCss}>
        <Icon name={icon} size={13} />
        <span css={textCss}>{title}</span>
      </span>
      <span css={[textCss, id === 'stack' && highlightCss]}>{children}</span>
    </div>
  );
};

const selfCss = css(flex('', '', 'row', 30));
// gap 임시

const textCss = css(fontCss.style.R14);
const titleBoxCss = css(inlineFlex('center', 'center', 'row', 6));
const highlightCss = css(
  { color: palettes.secondary.default },
  flex('', '', 'row', 2)
);

export default Info;
