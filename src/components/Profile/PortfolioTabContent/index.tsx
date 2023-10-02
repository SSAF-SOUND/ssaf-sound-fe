import { css } from '@emotion/react';

import { Tabs } from '~/components/Common/Tabs';
import { useMyPortfolio, useUserPortfolio } from '~/services/member';

import Portfolio from './Portfolio';
import PortfolioEditLink from './PortfolioEditLink';
import PortfolioError from './PortfolioError';
import PortfolioSkeleton from './PortfolioSkeleton';
import { ProfileTabs } from '../utils';

interface ProfilePortfolioTabContentProps {
  className?: string;
  mine?: boolean;
  userId: number;
  marginForExpand?: string;
}

export const ProfilePortfolioTabContent = (
  props: ProfilePortfolioTabContentProps
) => {
  const { className } = props;

  return (
    <Tabs.Content
      css={selfCss}
      value={ProfileTabs.PORTFOLIO}
      className={className}
    >
      <ProfilePortfolioTabContentInner {...props} />
    </Tabs.Content>
  );
};

const ProfilePortfolioTabContentInner = (
  props: ProfilePortfolioTabContentProps
) => {
  const { mine = false, userId, marginForExpand } = props;
  const myPortfolioQuery = useMyPortfolio({
    enabled: mine,
  });
  const userPortfolioQuery = useUserPortfolio(userId, {
    enabled: !mine,
  });

  const portfolioQuery = mine ? myPortfolioQuery : userPortfolioQuery;
  const { data: portfolio, isLoading, isError, error } = portfolioQuery;

  return (
    <>
      {isLoading ? (
        <PortfolioSkeleton />
      ) : isError ? (
        <PortfolioError error={error} />
      ) : (
        <>
          {mine && <PortfolioEditLink css={{ marginBottom: 52 }} />}

          <Portfolio portfolio={portfolio} marginForExpand={marginForExpand} />
        </>
      )}
    </>
  );
};

const selfCss = css({
  paddingTop: 20,
  paddingBottom: 20,
});
