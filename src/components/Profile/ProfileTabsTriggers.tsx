import { Tabs } from '~/components/Common';

import { ProfileTabs } from './utils';

interface ProfileTabsTriggersProps {
  className?: string;
}

const ProfileTabsTriggers = (props: ProfileTabsTriggersProps) => {
  const profileTabsTitles = Object.values(ProfileTabs);
  return (
    <Tabs.List {...props}>
      <Tabs.Border />
      {profileTabsTitles.map((title) => (
        <Tabs.Trigger key={title} theme="white" value={title}>
          {title}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
  );
};

export default ProfileTabsTriggers;
