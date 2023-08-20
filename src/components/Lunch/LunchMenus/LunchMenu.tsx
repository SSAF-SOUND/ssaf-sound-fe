import type {
  LunchDateSpecifier,
  LunchMenuDetail} from '~/services/lunch';

import { memo, useCallback } from 'react';

import { LunchCard } from '~/components/Lunch';
import {
  usePollLunchMenu,
  useRevertPolledLunchMenu,
} from '~/services/lunch';
import { handleAxiosError } from '~/utils';

export interface LunchMenuProps {
  menu: LunchMenuDetail;
  polled: boolean;
  index: number;
  campus: string;
  dateSpecifier: LunchDateSpecifier;
}

export const LunchMenu = memo((props: LunchMenuProps) => {
  const { index, polled, campus, dateSpecifier, menu } = props;
  const { lunchId } = menu;

  const { mutateAsync: pollLunchMenu, isLoading: isPollingLunchMenu } =
    usePollLunchMenu({
      lunchId,
      campus,
      dateSpecifier,
      polledIndex: index,
    });

  const {
    mutateAsync: revertPolledLunchMenu,
    isLoading: isRevertingPolledLunchMenu,
  } = useRevertPolledLunchMenu({
    lunchId,
    campus,
    dateSpecifier,
    polledIndex: index,
  });

  const isMutating = isPollingLunchMenu || isRevertingPolledLunchMenu;

  const handlePolledChange = useCallback(
    async (nextPolled: boolean) => {
      const pollRequest = nextPolled ? pollLunchMenu : revertPolledLunchMenu;

      try {
        await pollRequest();
      } catch (error) {
        handleAxiosError(error);
      }
    },
    [pollLunchMenu, revertPolledLunchMenu]
  );

  return (
    <LunchCard
      key={menu.lunchId}
      menu={menu}
      order={index + 1}
      polled={polled}
      onPolledChange={handlePolledChange}
      pollButtonDisabled={isMutating}
    />
  );
});

LunchMenu.displayName = 'LunchMenu';
