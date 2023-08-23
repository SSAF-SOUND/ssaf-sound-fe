import type { ComponentPropsWithoutRef } from 'react';

import { css } from '@emotion/react';
import { memo } from 'react';

import { fontCss, palettes, resetStyle } from '~/styles/utils';

interface RecruitResetButtonType
  extends Omit<ComponentPropsWithoutRef<'button'>, 'type'> {}

export const RecruitResetButton = memo((props: RecruitResetButtonType) => {
  return (
    <button css={selfCss} type="button" {...props}>
      <span css={textCss}>모집 초기화</span>
    </button>
  );
});

RecruitResetButton.displayName = 'ResetButton';

const selfCss = css(resetStyle.button());
const textCss = css(fontCss.family.auto, fontCss.style.R14, {
  color: palettes.white,
  textDecoration: 'underline',
});