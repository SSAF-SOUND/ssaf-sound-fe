import Link from 'next/link';

import { Button } from '~/components/Common/Button';
import { Theme } from '~/styles/utils';
import { routes } from '~/utils';

interface RecruitApplicantsLinkProps {
  recruitId: number;
  className?: string;
  loading?: boolean;
}

export const RecruitApplicantsLink = (props: RecruitApplicantsLinkProps) => {
  const { recruitId, ...restProps } = props;

  return (
    <Button asChild theme={Theme.RECRUIT} {...restProps}>
      <Link href={routes.recruit.applications.self(recruitId)}>
        리쿠르팅 신청목록 보기
      </Link>
    </Button>
  );
};
