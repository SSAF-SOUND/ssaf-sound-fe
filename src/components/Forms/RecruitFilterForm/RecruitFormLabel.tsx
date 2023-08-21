import { css } from '@emotion/react';

import { Separator } from '~/components/Common';
import { flex, fontCss, palettes } from '~/styles/utils';

export const RecruitFormLabel = () => {
  return (
    <div css={selfCss}>
      <Separator
        orientation="horizontal"
        width="12%"
        height="5px"
        css={{
          background: palettes.font.blueGrey,
        }}
      />
      <label css={labelCss}>상세 옵션 선택</label>
    </div>
  );
};

const selfCss = css(flex('center', '', 'column', 6));
const labelCss = css(fontCss.family.auto, fontCss.style.R12);
