import type { ArticleDetail } from '~/services/article';

import { css } from '@emotion/react';

import ThumbnailBar from '~/components/ThumbnailBar';
import { flex, fontCss, palettes } from '~/styles/utils';

import ArticleContent from './ArticleContent';

interface ArticleMainProps {
  className?: string;
  articleDetail: ArticleDetail;
}

const ArticleMain = (props: ArticleMainProps) => {
  const { articleDetail, className } = props;
  const { title, modified, content, images } = articleDetail;
  const hasImage = !!images.length;
  const thumbnails = images.map(({ imageUrl }) => ({
    thumbnailUrl: imageUrl,
    loading: false,
  }));

  return (
    <div className={className}>
      <h2 css={[titleCss, { marginBottom: 24 }]}>
        <span>{title}</span>
        {modified && <strong css={modifyIndicator}>(수정됨)</strong>}
      </h2>

      <ArticleContent html={content} css={{ marginBottom: 20 }} />
      {hasImage && (
        <ThumbnailBar
          css={thumbnailBarCss}
          thumbnails={thumbnails}
          disableRemove
        />
      )}
    </div>
  );
};

export default ArticleMain;

const titleCss = css(
  fontCss.style.B20,
  fontCss.family.pretendard,
  flex('center', '', 'row', 10)
);

const modifyIndicator = css({ color: palettes.primary.dark });

const thumbnailBarCss = css({
  backgroundColor: palettes.background.grey,
  padding: 0,
});
