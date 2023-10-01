import type { ArticleCategory } from '~/services/article';

import Image from 'next/image';
import Link from 'next/link';

import { css } from '@emotion/react';
import { isNullOrUndefined } from 'is-what';

import { flex, fontCss, palettes } from '~/styles/utils';
import { routes } from '~/utils';

const imageSize = 100;

interface ArticleCategoryCardProps {
  articleCategory: ArticleCategory;
}

const ArticleCategoryCard = (props: ArticleCategoryCardProps) => {
  const { articleCategory } = props;
  const { boardId, title, description, imageUrl } = articleCategory;
  const isValidImageUrl = !isNullOrUndefined(imageUrl);

  return (
    <Link css={selfCss} href={routes.article.category(boardId)}>
      <div>
        <h2 css={titleCss}>{title}</h2>
        <p css={descriptionCss}>{description}</p>
      </div>
      {/* https://stackoverflow.com/questions/73570140/typeerror-cannot-read-properties-of-null-reading-default-in-next-js */}
      {isValidImageUrl && (
        <Image
          css={imageCss}
          src={imageUrl}
          alt="게시판 이미지"
          width={imageSize}
          height={imageSize}
        />
      )}
    </Link>
  );
};

export default ArticleCategoryCard;

const selfCss = css(
  {
    overflow: 'hidden',
    position: 'relative',
    minWidth: 330,
    width: '100%',
    backgroundColor: palettes.white,
    color: palettes.black,
    padding: 24,
    borderRadius: 20,
    transition: 'transform 200ms',
    '&:hover, &:focus-visible': {
      transform: 'scale(1.02)',
    },
    '&:active': {
      transform: 'scale(0.99)',
    },
  },
  flex('center', 'space-between', 'row'),
  fontCss.style.B20,
  fontCss.family.auto
);

const titleCss = css(fontCss.style.B24);
const descriptionCss = css(
  { color: palettes.font.blueGrey, backgroundColor: palettes.white },
  fontCss.style.B14
);
const imageCss = css({
  position: 'absolute',
  borderRadius: 8,
  bottom: -8,
  right: 12,
});
