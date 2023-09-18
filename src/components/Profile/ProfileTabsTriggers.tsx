import { Tabs } from '~/components/Common';

import { ProfileTabs } from './utils';

interface ProfileTabsTriggersProps {
  className?: string;
}

const tabDisplayValue = {
  [ProfileTabs.PORTFOLIO]: '포트폴리오',
  [ProfileTabs.PROJECT]: '프로젝트',
  [ProfileTabs.STUDY]: '스터디',
};

const ProfileTabsTriggers = (props: ProfileTabsTriggersProps) => {
  return (
    <Tabs.List {...props}>
      <Tabs.Border />
      {Object.values(ProfileTabs).map((value) => (
        <Tabs.Trigger key={value} theme="white" value={value}>
          {tabDisplayValue[value]}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
  );
};

export default ProfileTabsTriggers;
