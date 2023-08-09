import { ArticleCard as Card } from './ArticleCard';
import { ArticleCardSkeleton } from './ArticleCardSkeleton';
import { HotArticleCard as HotCard } from './HotArticleCard';
import { HotArticleCardSkeleton } from './HotArticleCardSkeleton';

export const ArticleCard = Object.assign(Card, {
  Skeleton: ArticleCardSkeleton,
});

export const HotArticleCard = Object.assign(HotCard, {
  Skeleton: HotArticleCardSkeleton,
});
