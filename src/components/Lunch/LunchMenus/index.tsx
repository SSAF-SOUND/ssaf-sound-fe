import type { LunchDateSpecifier } from '~/services/lunch';

import { css } from '@emotion/react';

import { LunchCard } from '~/components/Lunch/LunchCard';
import { LunchMenu } from '~/components/Lunch/LunchMenus/LunchMenu';
import { useLunchMenusWithPollStatus } from '~/services/lunch';
import { flex } from '~/styles/utils';

interface LunchMenusProps {
  className?: string;
  campus: string;
  dateSpecifier: LunchDateSpecifier;
}

const LunchMenus = (props: LunchMenusProps) => {
  const { className, campus, dateSpecifier } = props;
  const skeletonCount = 6;

  const {
    data: lunchMenusWithPollStatus,
    isLoading: isLunchMenusWithPollStatusLoading,
  } = useLunchMenusWithPollStatus({
    dateSpecifier,
    campus,
  });

  return (
    <div css={selfCss} className={className}>
      {isLunchMenusWithPollStatusLoading && (
        <LunchCard.Skeleton
          count={skeletonCount}
          style={{ marginBottom: cardGap }}
        />
      )}

      {lunchMenusWithPollStatus &&
        lunchMenusWithPollStatus.menus.map((menu, index) => {
          const polled = index === lunchMenusWithPollStatus.polledAt;

          return (
            <LunchMenu
              key={menu.lunchId}
              campus={campus}
              dateSpecifier={dateSpecifier}
              index={index}
              menu={menu}
              polled={polled}
            />
          );
        })}
    </div>
  );
};

export default LunchMenus;

const cardGap = 16;

const selfCss = css({ width: '100%' }, flex('', '', 'column', cardGap));
