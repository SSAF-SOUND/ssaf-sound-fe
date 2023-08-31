import { css } from '@emotion/react';
import Skeleton from 'react-loading-skeleton';

import { LunchMenusPreviewError } from '~/components/Lunch/LunchMenusPreview/LunchMenusPreviewError';
import { LunchMenusPreviewMenuDescription } from '~/components/Lunch/LunchMenusPreview/LunchMenusPreviewMenuDescription';
import {
  LunchDateSpecifier,
  useLunchMenusWithPollStatus,
} from '~/services/lunch';
import { useCampuses } from '~/services/meta';
import { flex, pageMinWidth, palettes } from '~/styles/utils';

import { LunchMenusPreviewHeader } from './LunchMenusPreviewHeader';

export interface LunchMenusPreviewProps {
  className?: string;
  campus?: string;
}

const dateSpecifier = LunchDateSpecifier.TODAY;

export const LunchMenusPreview = (props: LunchMenusPreviewProps) => {
  const { className, campus } = props;
  const { data: campuses } = useCampuses();
  const safeCampus = campus && campuses.includes(campus) ? campus : campuses[0];

  const {
    data: lunchMenusWithPollStatus,
    isLoading: isLunchMenusWithPollStatusLoading,
    isError: isLunchMenusWithPollStatusError,
    error: lunchMenusWithPollStatusError,
    refetch,
  } = useLunchMenusWithPollStatus({
    campus: safeCampus,
    dateSpecifier,
  });

  const lunchMenusViewCount = 3;

  return (
    <div css={selfCss} className={className}>
      <LunchMenusPreviewHeader
        css={{ marginBottom: 16 }}
        campus={safeCampus}
        dateSpecifier={dateSpecifier}
      />

      <div css={menusCss}>
        {isLunchMenusWithPollStatusLoading && (
          <LunchMenusPreviewMenuDescriptionSkeleton />
        )}

        {isLunchMenusWithPollStatusError && (
          <LunchMenusPreviewError
            error={lunchMenusWithPollStatusError}
            onClickRetry={refetch}
          />
        )}

        {lunchMenusWithPollStatus?.menus
          .slice(0, lunchMenusViewCount)
          .map((menu) => {
            return (
              <LunchMenusPreviewMenuDescription
                key={menu.lunchId}
                menu={menu}
              />
            );
          })}
      </div>
    </div>
  );
};

const selfCss = css({
  minWidth: pageMinWidth - 40,
  padding: '10px 0 0',
  borderRadius: 20,
  backgroundColor: palettes.white,
  color: palettes.font.grey,
  overflow: 'hidden',
});

const menusCss = css({ width: '100%' }, flex('center', 'space-between', 'row'));

const LunchMenusPreviewMenuDescriptionSkeleton = () => {
  const skeletonCount = 3;

  return (
    <>
      {Array(skeletonCount)
        .fill(undefined)
        .map((_, index) => (
          <div css={skeletonContainerCss} key={index}>
            <Skeleton width={36} height={26} />
            <Skeleton circle width={110} height={110} />
          </div>
        ))}
    </>
  );
};
const skeletonContainerCss = css(flex('center', '', 'column', 4));
