import { JoinedRecruitsTabContent } from './JoinedRecruitsTabContent';
import MyInfoSettingsLink from './MyInfoSettingsLink';
import { ProfilePortfolioTabContent } from './PortfolioTabContent';
import NavItem from './ProfileNavItem';
import PrivateIndicator from './ProfilePrivateIndicator';
import ProfileTabsRoot from './ProfileTabsRoot';
import ProfileTabsTriggers from './ProfileTabsTriggers';
import UserError from './UserError';

export const Profile = {
  NavItem,
  MyInfoSettingsLink,
  PrivateIndicator,
  UserError,
  Tabs: {
    Root: ProfileTabsRoot,
    Triggers: ProfileTabsTriggers,
    PortfolioTabContent: ProfilePortfolioTabContent,
    JoinedRecruitsTabContent,
  },
};

export * from './utils';
