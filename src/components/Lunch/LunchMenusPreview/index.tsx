import { css } from '@emotion/react';
import Skeleton from 'react-loading-skeleton';

import { Scroll } from '~/components/Common/Scroll';
import { LunchMenusPreviewError } from '~/components/Lunch/LunchMenusPreview/LunchMenusPreviewError';
import { LunchMenusPreviewMenuDescription } from '~/components/Lunch/LunchMenusPreview/LunchMenusPreviewMenuDescription';
import {
  emptyLunchMenuDescription,
  LunchDateSpecifier,
  useLunchMenusWithPollStatus,
} from '~/services/lunch';
import { SsafyCampus, SsafyCampusSet } from '~/services/meta/utils';
import { flex, fontCss, pageMinWidth, palettes } from '~/styles/utils';

import { LunchMenusPreviewHeader } from './LunchMenusPreviewHeader';

export interface LunchMenusPreviewProps {
  className?: string;
  campus?: string;
}

const dateSpecifier = LunchDateSpecifier.TODAY;

export const LunchMenusPreview = (props: LunchMenusPreviewProps) => {
  const { className, campus } = props;
  const safeCampus =
    campus && SsafyCampusSet.has(campus) ? campus : SsafyCampus.SEOUL;

  const {
    data: lunchMenusWithPollStatus,
    isLoading: isLunchMenusWithPollStatusLoading,
    isError: isLunchMenusWithPollStatusError,
    error: lunchMenusWithPollStatusError,
    isSuccess: lunchMenusWithPollStatusSuccess,
  } = useLunchMenusWithPollStatus({
    campus: safeCampus,
    dateSpecifier,
  });

  const isLunchMenusEmpty =
    lunchMenusWithPollStatusSuccess &&
    lunchMenusWithPollStatus.menus.length === 0;

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
            css={{ height: 172 }}
          />
        )}

        {isLunchMenusEmpty && <LunchMenusPreviewEmptyDescription />}

        {lunchMenusWithPollStatusSuccess && (
          <Scroll.Root css={scrollRootCss}>
            <Scroll.Viewport>
              <div css={scrollViewportContentCss}>
                {lunchMenusWithPollStatus.menus.map((menu) => (
                  <LunchMenusPreviewMenuDescription
                    key={menu.lunchId}
                    menu={menu}
                  />
                ))}
              </div>
            </Scroll.Viewport>
            <Scroll.Bar orientation="horizontal">
              <Scroll.Thumb />
            </Scroll.Bar>
          </Scroll.Root>
        )}
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

const menusCss = css({
  position: 'relative',
  width: '100%',
});

const scrollRootCss = css({ width: '100%', paddingBottom: 24 });
const scrollViewportContentCss = css(flex('center', 'flex-start', 'row', 16));

const LunchMenusPreviewMenuDescriptionSkeleton = () => {
  const skeletonCount = 4;

  return (
    <div css={skeletonSelfCss}>
      {Array(skeletonCount)
        .fill(undefined)
        .map((_, index) => (
          <div css={skeletonContainerCss} key={index}>
            <Skeleton width={36} height={26} />
            <Skeleton circle width={110} height={110} />
          </div>
        ))}
    </div>
  );
};
const skeletonSelfCss = css(flex('center', 'space-between', 'row', 16));

const skeletonContainerCss = css(
  { height: 172 },
  flex('center', '', 'column', 4)
);

const LunchMenusPreviewEmptyDescription = () => {
  return <div css={emptyDescriptionCss}>{emptyLunchMenuDescription}</div>;
};

const emptyDescriptionCss = css(
  { width: '100%', height: 172 },
  flex('center', 'center'),
  fontCss.style.B14
);
