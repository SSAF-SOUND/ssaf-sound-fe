import type { IconNames } from '~/components/Common/Icon';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

import { DevSignInModalTrigger } from '~/components/__dev__/DevSignInModalTrigger';
import { Dot } from '~/components/Common/Dot';
import { Icon } from '~/components/Common/Icon';
import { IconButton } from '~/components/Common/IconButton';
import { NotificationPopover } from '~/components/Notification';
import { useSignOutReconfirmModal } from '~/hooks';
import { useMyInfo } from '~/services/member';
import { flex, palettes } from '~/styles/utils';
import { getPathname, routes, webStorage } from '~/utils';

export const PrivateButtonsLayer = () => {
  const { data: myInfo, isFetching } = useMyInfo();
  const router = useRouter();
  const isSignedIn = !!myInfo;
  const { openSignOutReconfirmModal } = useSignOutReconfirmModal();

  const onClickSignInButton = () => {
    webStorage.setSignInReturnPage(getPathname());
    router.push(routes.auth.signIn());
  };

  if (isFetching) {
    return <ClipLoader size={20} color={palettes.grey.dark} />;
  }

  return (
    <div css={privateButtonLayerSelfCss}>
      <DevSignInModalTrigger />
      {isSignedIn ? (
        <>
          <NotificationPopover />
          <PrivateButton
            iconName="signOut"
            label="로그아웃"
            onClick={openSignOutReconfirmModal}
            hasUnreadMessage={false}
            withUnreadMessageLayer={false}
          />
        </>
      ) : (
        <PrivateButton
          onClick={onClickSignInButton}
          iconName="signIn"
          label="로그인"
          hasUnreadMessage={false}
          withUnreadMessageLayer={false}
        />
      )}
    </div>
  );
};

const iconSize = 28;
const iconContainerGap = 4;
const unreadMessageMarkSize = 10;
const iconContainerWidth = iconSize + iconContainerGap + unreadMessageMarkSize;

interface PrivateButtonProps {
  iconName: IconNames;
  label: string;
  hasUnreadMessage?: boolean;
  onClick: () => void;
  withUnreadMessageLayer?: boolean;
}

const PrivateButton = (props: PrivateButtonProps) => {
  const {
    iconName,
    hasUnreadMessage = false,
    label,
    onClick,
    withUnreadMessageLayer = true,
  } = props;

  return (
    <div
      css={[
        privateButtonSelfCss,
        withUnreadMessageLayer && withUnreadMessageLayerCss,
      ]}
    >
      {withUnreadMessageLayer && (
        <div css={unreadMessageIndicatorCss}>
          {hasUnreadMessage && <Dot size="sm" theme="recruit" />}
        </div>
      )}
      <IconButton onClick={onClick} size={iconSize + 4}>
        <Icon name={iconName} size={iconSize} label={label} />
      </IconButton>
    </div>
  );
};

const privateButtonLayerSelfCss = css(flex('center', '', 'row', 10));
const privateButtonSelfCss = css(
  { minWidth: iconContainerWidth - unreadMessageMarkSize },
  flex('center', 'flex-end', 'row', iconContainerGap)
);
const withUnreadMessageLayerCss = css({
  minWidth: iconContainerWidth,
});

const unreadMessageIndicatorCss = css({ width: 10 }, flex('center', 'center'));
