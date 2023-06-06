import { css } from '@emotion/react';

interface Props {
  place: string;
}
const Place = ({ place }: Props) => {
  return <span css={placeCss}>{place}</span>;
};

// todo absolute -> 다른 방식으로
const placeCss = css({
  position: 'absolute',
  top: 28,
  left: 39,
  fontSize: 16,
  fontWeight: 700,
  letterSpacing: '-1.95px',
  lineHeight: '40px',
});

export default Place;
