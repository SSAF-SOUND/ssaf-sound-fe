import { css } from '@emotion/react';
import Skeleton from 'react-loading-skeleton';

import { Button } from '~/components/Common';
import {
  LunchDateSpecifier,
  useLunchMenusWithPollStatus,
} from '~/services/lunch';
import { useCampuses } from '~/services/meta';
import { flex, fontCss, pageMinWidth, palettes } from '~/styles/utils';

import { LunchMenusPreviewHeader } from './LunchMenusPreviewHeader';
import { LunchMenusPreviewMenuDescription } from './LunchMenusPreviewMenuDescription';

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
          <LunchMenusPreviewMenuDescriptionError onClickRetry={refetch} />
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

const LunchMenusPreviewMenuDescriptionError = (props: {
  onClickRetry: () => void;
}) => {
  const { onClickRetry } = props;
  return (
    <div css={lunchMenusPreviewMenuDescriptionErrorSelfCss}>
      <p css={[{ marginBottom: 12 }, fontCss.style.B16]}>
        오류가 발생했습니다.
      </p>
      <Button
        variant="filled"
        theme="error"
        onClick={onClickRetry}
        css={{ width: 130, color: palettes.white }}
      >
        재시도
      </Button>
    </div>
  );
};

const lunchMenusPreviewMenuDescriptionErrorSelfCss = css(
  { width: '100%', height: 140 },
  flex('center', 'center')
);
