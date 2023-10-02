import type { TabsProps } from '@radix-ui/react-tabs';

import { Tabs } from '~/components/Common/Tabs';
import { ProfileTabs } from '~/components/Profile/utils';

interface ProfileTabsRootProps extends TabsProps {}

const ProfileTabsRoot = (props: ProfileTabsRootProps) => {
  return <Tabs.Root defaultValue={ProfileTabs.PORTFOLIO} {...props} />;
};

export default ProfileTabsRoot;
