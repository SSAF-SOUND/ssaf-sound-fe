import { css } from '@emotion/react';

interface Props {
  mainMenu: string;
  extraMenu: string;
}

const Menu = (props: Props) => {
  const { mainMenu, extraMenu } = props;

  return (
    <div css={baseCss}>
      <span css={mainCss}>{mainMenu}</span>
      <span css={extraCss}>{extraMenu}</span>
    </div>
  );
};

const baseCss = css({
  paddingTop: 70,
  paddingLeft: 27,
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

const mainCss = css({
  fontSize: 31,
  fontWeight: 700,
});

const extraCss = css({
  fontSize: 15,
  fontWeight: 700,
});

export default Menu;
