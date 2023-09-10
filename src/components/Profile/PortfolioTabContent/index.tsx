import { css } from '@emotion/react';

import { Tabs } from '~/components/Common';
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
  marginForExpand?: number | string;
}

const ProfilePortfolioTabContent = (props: ProfilePortfolioTabContentProps) => {
  const { mine = false, userId, className, marginForExpand } = props;
  const myPortfolioQuery = useMyPortfolio({
    enabled: mine,
  });
  const userPortfolioQuery = useUserPortfolio(userId, {
    enabled: !mine,
  });

  const portfolioQuery = mine ? myPortfolioQuery : userPortfolioQuery;
  const { data: portfolio, isLoading, isError, error } = portfolioQuery;

  return (
    <Tabs.Content
      css={selfCss}
      value={ProfileTabs.PORTFOLIO}
      className={className}
    >
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
    </Tabs.Content>
  );
};

export default ProfilePortfolioTabContent;

const selfCss = css({
  paddingTop: 20,
  paddingBottom: 20,
});
