import { css } from '@emotion/react';

import { fontCss, palettes } from '~/styles/utils';

const headingCss = css({
  '& h1': [{ margin: '10px 0 15px' }, fontCss.style.B24],
  '& h2': [{ margin: '5px 0 10px' }, fontCss.style.B20],
  '& h3': [{ margin: '0 0 5px' }, fontCss.style.B18],
});

const paragraphCss = css({
  '& p': fontCss.style.R14,
});

const listCss = css({
  '& ol': {
    listStyleType: 'number',
  },
  '& ul': {
    listStyleType: 'disc',
  },
  '& ol, & ul': {
    paddingLeft: 20,
  },
});

const linkCss = css({
  '& a': [
    {
      color: palettes.primary.default,
      textDecoration: 'underline',
      ':hover': {
        color: palettes.primary.dark,
      },
      ':active': {
        color: palettes.primary.light,
      },
    },
  ],
});

const boldCss = css({
  '& strong': {
    fontWeight: 700,
  },
});

const codeCss = css({
  '& code': {
    backgroundColor: palettes.grey2,
    padding: '2px 6px',
    borderRadius: 10,
  },
  '& pre': {
    backgroundColor: '#23241f',
    color: '#f8f8f2',
    overflow: 'visible',
    borderRadius: 3,
    padding: '2px 6px',
    margin: '5px 0',
  },
});

export const articleCss = css(
  headingCss,
  paragraphCss,
  listCss,
  linkCss,
  boldCss,
  codeCss,
  fontCss.style.R14
);
