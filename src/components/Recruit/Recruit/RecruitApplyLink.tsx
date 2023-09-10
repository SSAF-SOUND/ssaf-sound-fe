import type { Theme } from '~/styles/utils';

import Link from 'next/link';

import { Button } from '~/components/Common';
import { routes } from '~/utils';

interface RecruitApplyLinkProps {
  className?: string;
  onClick?: () => void;
  theme: Extract<Theme, Theme.PRIMARY | Theme.SECONDARY>;
  recruitId: number;
}

export const RecruitApplyLink = (props: RecruitApplyLinkProps) => {
  const { recruitId } = props;
  return (
    <Button {...props} asChild>
      <Link href={routes.recruit.apply(recruitId)}> 리쿠르팅 신청</Link>
    </Button>
  );
};
