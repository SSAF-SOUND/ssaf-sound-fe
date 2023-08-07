import Link from 'next/link';

import { Icon, IconButton } from '~/components/Common';
import { routes } from '~/utils';

const MyInfoSettingsLink = () => {
  return (
    <IconButton asChild size={34}>
      <Link href={routes.profile.myInfoSettings()}>
        <Icon name="setting" size={28} />
      </Link>
    </IconButton>
  );
};

export default MyInfoSettingsLink;
