import Link from 'next/link';

import { css } from '@emotion/react';

import { Button } from '~/components/Common';
import { palettes, Theme } from '~/styles/utils';
import { routes } from '~/utils';

interface RecruitMyApplicationLinkProps {
  recruitId: number;
  className?: string;
  loading?: boolean;
}

export const RecruitMyApplicationLink = (
  props: RecruitMyApplicationLinkProps
) => {
  const { recruitId, ...restProps } = props;

  return (
    <Button theme={Theme.GREY} asChild css={selfCss} {...restProps}>
      <Link href={routes.recruit.applications.mine(recruitId)}>
        리쿠르팅 신청내용 보기
      </Link>
    </Button>
  );
};

const selfCss = css({ color: palettes.white });
