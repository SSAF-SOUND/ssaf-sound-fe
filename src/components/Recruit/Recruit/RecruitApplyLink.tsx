import type { Theme } from '~/styles/utils';

import Link from 'next/link';

import { Button } from '~/components/Common/Button';
import { routes } from '~/utils';

interface RecruitApplyLinkProps {
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  theme: Theme.PRIMARY | Theme.SECONDARY;
  recruitId: number;
}

export const RecruitApplyLink = (props: RecruitApplyLinkProps) => {
  const { recruitId, ...restProps } = props;
  return (
    <Button {...restProps} asChild>
      <Link href={routes.recruit.apply(recruitId)}> 리쿠르팅 신청</Link>
    </Button>
  );
};
