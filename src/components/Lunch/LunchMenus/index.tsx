import type { LunchDateSpecifier } from '~/services/lunch';

import { css } from '@emotion/react';

import { ErrorMessageWithSsafyIcon } from '~/components/ErrorMessageWithSsafyIcon';
import { LunchCard } from '~/components/Lunch/LunchCard';
import { useSignInGuideModal } from '~/hooks';
import {
  useLunchMenusWithPollStatus,
  usePollLunchMenu,
  useRevertPolledLunchMenu,
  emptyLunchMenuDescription,
} from '~/services/lunch';
import { useMyInfo } from '~/services/member';
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
  const { openSignInGuideModal } = useSignInGuideModal();
  const { data: myInfo } = useMyInfo();
  const isSignedIn = !!myInfo;

  const {
    data: lunchMenusWithPollStatus,
    isLoading: isLunchMenusWithPollStatusLoading,
    isError: isLunchMenusWithPollStatusError,
    error: lunchMenusWithPollStatusError,
    isSuccess: lunchMenusWithPollStatusSuccess,
    isFetching,
  } = useLunchMenusWithPollStatus({
    dateSpecifier,
    campus,
  });

  const isLunchMenusEmpty =
    lunchMenusWithPollStatusSuccess &&
    lunchMenusWithPollStatus.menus.length === 0;

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
        <LunchMenusError error={lunchMenusWithPollStatusError} />
      )}

      {isLunchMenusWithPollStatusLoading && (
        <LunchCard.Skeleton
          count={skeletonCount}
          style={{ marginBottom: cardGap }}
        />
      )}

      {isLunchMenusEmpty && <LunchMenusEmptyDescription />}

      {lunchMenusWithPollStatusSuccess &&
        lunchMenusWithPollStatus.menus.map((menu, index) => {
          const polled = index === lunchMenusWithPollStatus.polledAt;
          const { lunchId } = menu;

          const handlePolledChange = async (nextPolled: boolean) => {
            if (!isSignedIn) {
              openSignInGuideModal();
              return;
            }

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

const LunchMenusError = (props: { error: unknown }) => {
  const { error } = props;
  const response = getErrorResponse(error);
  const errorMessage =
    response?.message ?? '점심 데이터를 불러오는 중 오류가 발생했습니다.';

  return (
    <ErrorMessageWithSsafyIcon css={{ marginTop: 48 }} message={errorMessage} />
  );
};

const LunchMenusEmptyDescription = () => {
  return (
    <div css={emptyLunchMenusDescriptionCss}>{emptyLunchMenuDescription}</div>
  );
};

const emptyLunchMenusDescriptionCss = css(
  { height: 300 },
  flex('center', 'center')
);
