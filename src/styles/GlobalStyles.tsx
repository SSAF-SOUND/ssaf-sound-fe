import { css, Global } from '@emotion/react';
import React, { memo } from 'react';

import { globalVars, palettes } from '~/styles/utils';
import { createThemePalettes } from '~/styles/utils/themeColorVars';

const GlobalStyles = memo(() => {
  return (
    <Global
      styles={[resetCss, customBaseCss, themeColorVarCss, globalVarCss]}
    />
  );
});

GlobalStyles.displayName = 'GlobalStyles';

const resetCss = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

const customBaseCss = css`
  body {
    min-width: 320px;
    background: ${palettes.background.default};
    color: ${palettes.white};
  }

  button {
    outline: 0;
    border: 0;
  }

  * {
    box-sizing: border-box;
    font-family: Manrope, Pretendard,
      '-apple-system, BlinkMacSystemFont, system-ui, Roboto, "Noto Sans KR", sans-serif';
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const themeColorVarCss = css({
  '[data-theme="primary"]': createThemePalettes(
    palettes.primary.default,
    palettes.primary.light,
    palettes.primary.dark,
    palettes.primary.darken,
    palettes.primary.darkest
  ),
  '[data-theme="secondary"]': createThemePalettes(
    palettes.secondary.default,
    palettes.secondary.light,
    palettes.secondary.dark,
    palettes.secondary.darken,
    palettes.secondary.darkest
  ),
  '[data-theme="grey"]': createThemePalettes(
    palettes.grey.default,
    palettes.grey.light,
    palettes.grey.dark
  ),
  '[data-theme="recruit"]': createThemePalettes(
    palettes.recruit.default,
    palettes.recruit.light,
    palettes.recruit.dark
  ),
  '[data-theme="success"]': createThemePalettes(
    palettes.success.default,
    palettes.success.light,
    palettes.success.dark
  ),
  '[data-theme="warning"]': createThemePalettes(
    palettes.warning.default,
    palettes.warning.light,
    palettes.warning.dark
  ),
  '[data-theme="error"]': createThemePalettes(
    palettes.error.default,
    palettes.error.light,
    palettes.error.dark
  ),
  '[data-theme="white"]': createThemePalettes(
    palettes.white,
    palettes.white,
    palettes.grey4,
    palettes.grey2,
    palettes.grey0
  ),
  '[data-theme="black"]': createThemePalettes(
    palettes.grey0,
    palettes.grey1,
    palettes.grey0,
    palettes.black,
    palettes.black
  ),
});

const globalVarCss = css({
  ':root': {
    [globalVars.mainLayoutPaddingX.varName]: '25px',
  },
});

export default GlobalStyles;
