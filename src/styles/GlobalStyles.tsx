import { css, Global } from '@emotion/react';
import React, { memo } from 'react';

import { palettes } from '~/styles/utils';
import { themeColorVars } from '~/styles/utils/themeColorVars';

const GlobalStyles = memo(() => {
  return <Global styles={[resetCss, customBaseCss, themeColorVarCss]} />;
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
  '[data-theme="primary"]': {
    [themeColorVars.mainColor.varName]: palettes.primary.default,
    [themeColorVars.mainLightColor.varName]: palettes.primary.light,
    [themeColorVars.mainDarkColor.varName]: palettes.primary.dark,
    [themeColorVars.mainDarkColor.varName]: palettes.primary.dark,
    [themeColorVars.mainDarkestColor.varName]: '',
  },
  '[data-theme="secondary"]': {
    [themeColorVars.mainColor.varName]: palettes.secondary.default,
    [themeColorVars.mainLightColor.varName]: palettes.secondary.light,
    [themeColorVars.mainDarkColor.varName]: palettes.secondary.dark,
    [themeColorVars.mainDarkestColor.varName]: '',
  },
});

export default GlobalStyles;
