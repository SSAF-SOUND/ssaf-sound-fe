import type { LunchDateSpecifier } from '~/services/lunch';

import { css } from '@emotion/react';

import { LunchCard } from '~/components/Lunch/LunchCard';
import { LunchErrorIndicator } from '~/components/Lunch/LunchErrorIndicator';
import {
  useLunchMenusWithPollStatus,
  usePollLunchMenu,
  useRevertPolledLunchMenu,
} from '~/services/lunch';
import { flex } from '~/styles/utils';
import { getErrorResponse, handleAxiosError } from '~/utils';

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
    isError: isLunchMenusWithPollStatusError,
    error: lunchMenusWithPollStatusError,
    isFetching,
  } = useLunchMenusWithPollStatus({
    dateSpecifier,
    campus,
  });

  const { mutateAsync: pollLunchMenu, isLoading: isPollingLunchMenu } =
    usePollLunchMenu({
      campus,
      dateSpecifier,
    });

  const {
    mutateAsync: revertPolledLunchMenu,
    isLoading: isRevertingPolledLunchMenu,
  } = useRevertPolledLunchMenu({
    campus,
    dateSpecifier,
  });

  const isButtonDisabled =
    isPollingLunchMenu || isRevertingPolledLunchMenu || isFetching;

  return (
    <div css={selfCss} className={className}>
      {isLunchMenusWithPollStatusError && (
        <ErrorLayer error={lunchMenusWithPollStatusError} />
      )}

      {isLunchMenusWithPollStatusLoading && (
        <LunchCard.Skeleton
          count={skeletonCount}
          style={{ marginBottom: cardGap }}
        />
      )}

      {lunchMenusWithPollStatus &&
        lunchMenusWithPollStatus.menus.map((menu, index) => {
          const polled = index === lunchMenusWithPollStatus.polledAt;
          const { lunchId } = menu;

          const handlePolledChange = async (nextPolled: boolean) => {
            const pollRequest = nextPolled
              ? pollLunchMenu
              : revertPolledLunchMenu;

            try {
              await pollRequest({ lunchId, polledIndex: index });
            } catch (error) {
              handleAxiosError(error);
            }
          };

          return (
            <LunchCard
              key={menu.lunchId}
              menu={menu}
              order={index + 1}
              polled={polled}
              onPolledChange={handlePolledChange}
              pollButtonDisabled={isButtonDisabled}
            />
          );
        })}
    </div>
  );
};

export default LunchMenus;

const cardGap = 16;

const selfCss = css({ width: '100%' }, flex('', '', 'column', cardGap));

const ErrorLayer = (props: { error: unknown }) => {
  const { error } = props;
  const response = getErrorResponse(error);

  return (
    <LunchErrorIndicator css={{ marginTop: 48 }} message={response?.message} />
  );
};
