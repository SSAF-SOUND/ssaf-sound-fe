import type { InfoType } from './utils';
import type { IconNames } from '../Common/Icon';

import { css } from '@emotion/react';

import { flex, fontCss, inlineFlex, palettes } from '~/styles/utils';

import { Icon } from '../Common';

interface InfoProps<T> {
  icon: IconNames;
  title: InfoType;
  content: T[];
  parser?: (arr: T[]) => string;
}

const Info = <T,>(props: InfoProps<T>) => {
  const { icon, title, parser, content } = props;
  return (
    <div css={selfCss}>
      <span css={titleBoxCss}>
        <Icon name={icon} size={13} />
        <span css={textCss}>{title}</span>
      </span>
      <span css={[textCss, title === '기술 스택' && highlightCss]}>
        {parser?.(content)}
      </span>
    </div>
  );
};

const selfCss = css(flex('', '', 'row', 30));
// gap 임시

const textCss = css(fontCss.style.R14);
const titleBoxCss = css(inlineFlex('center', 'center', 'row', 6));
const highlightCss = css({ color: palettes.secondary.default });

export default Info;
