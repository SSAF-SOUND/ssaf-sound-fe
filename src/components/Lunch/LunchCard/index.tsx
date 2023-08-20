import { LunchCard as Card } from './LunchCard';
import { LunchCardSkeleton } from './LunchCardSkeleton';

export const LunchCard = Object.assign(Card, {
  Skeleton: LunchCardSkeleton,
});

export type { LunchCardProps } from './LunchCard';
