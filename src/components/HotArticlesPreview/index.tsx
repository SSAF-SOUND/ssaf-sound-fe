import { useHotArticles } from '~/services/article';

import { HotArticlesPreviewHeader } from './HotArticlesPreviewHeader';

export interface HotArticlesPreviewProps {
  className?: string;
}

export const HotArticlesPreview = (props: HotArticlesPreviewProps) => {
  const { className } = props;
  const { data: hotArticles } = useHotArticles();

  const maxViewCount = 5;
  const latestHotArticles = hotArticles?.pages[0].posts.slice(0, maxViewCount);
  console.log(hotArticles);

  return (
    <div className={className}>
      <HotArticlesPreviewHeader />

    </div>
  );
};
