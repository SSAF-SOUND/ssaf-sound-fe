import type { MouseEventHandler } from 'react';
import type { Theme } from '~/styles/utils';

import Link from 'next/link';


import { Button } from '~/components/Common/Button';
import { useSignInGuideModal } from '~/hooks';
import { useMyInfo } from '~/services/member';
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
  const { data: myInfo } = useMyInfo();
  const isSignedIn = !!myInfo;
  const { openSignInGuideModal } = useSignInGuideModal();

  const onClick: MouseEventHandler<HTMLAnchorElement> | undefined = isSignedIn
    ? undefined
    : (e) => {
        e.preventDefault();
        openSignInGuideModal();
      };

  return (
    <Button {...restProps} asChild>
      <Link href={routes.recruit.apply(recruitId)} onClick={onClick}>
        리쿠르팅 신청
      </Link>
    </Button>
  );
};
