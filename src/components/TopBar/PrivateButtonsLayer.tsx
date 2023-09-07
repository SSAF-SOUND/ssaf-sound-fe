import type { IconNames } from '~/components/Common';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

import { DevSignInModalTrigger } from '~/components/__dev__/DevSignInModalTrigger';
import { Dot, Icon, IconButton } from '~/components/Common';
import { useSignOutReconfirmModal } from '~/hooks';
import { useMyInfo } from '~/services/member';
import { flex, palettes } from '~/styles/utils';
import { getPathname, routes, webStorage } from '~/utils';

export const PrivateButtonsLayer = () => {
  const { data: myInfo, isLoading } = useMyInfo();
  const router = useRouter();
  const isSignedIn = !!myInfo;
  const { openSignOutReconfirmModal } = useSignOutReconfirmModal();

  const onClickSignInButton = () => {
    webStorage.setSignInReturnPage(getPathname());
    router.push(routes.signIn());
  };

  if (isLoading) {
    return <ClipLoader size={20} color={palettes.grey.dark} />;
  }

  return (
    <div css={privateButtonLayerSelfCss}>
      <DevSignInModalTrigger />
      {isSignedIn ? (
        <>
          {/*<PrivateButton*/}
          {/*  onClick={() => {}}*/}
          {/*  iconName="notification"*/}
          {/*  label="알림"*/}
          {/*  hasUnreadMessage={false}*/}
          {/*/>*/}
          {/*<PrivateButton*/}
          {/*  onClick={() => {}}*/}
          {/*  iconName="chat"*/}
          {/*  label="쪽지"*/}
          {/*  hasUnreadMessage={false}*/}
          {/*/>*/}
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
