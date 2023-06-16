import Image from 'next/image';

import { css } from '@emotion/react';

import characterLargeImage from '~/assets/images/character-large.png';
import { Button } from '~/components/Common';
import { flex, fontCss, palettes } from '~/styles/utils';

const NotFoundPage = () => {
  return (
    <div css={selfCss}>
      <div css={topBoxCss}>
        <h2 css={titleCss}>잘못된 페이지예요!</h2>
        <Image src={characterLargeImage} alt="잘못된 페이지 이미지" />
        <div css={descriptionCss}>
          <p>요청하신 페이지를 찾을 수 없습니다.</p>
          <p>주소가 정확한지 확인해주세요.</p>
        </div>
      </div>
      <div>
        <Button css={css({ width: '100%' })}>메인 페이지로 돌아가기</Button>
      </div>
    </div>
  );
};

const selfCss = css(
  {
    padding: '25vh 0 15vh',
    height: '100vh',
  },
  flex('center', 'space-between')
);

const topBoxCss = css(flex('center', 'space-between', 'column', 34));

const descriptionCss = css({ textAlign: 'center' }, fontCss.style.R14);

const titleCss = css({ color: palettes.primary.default }, fontCss.style.B28);

export default NotFoundPage;
