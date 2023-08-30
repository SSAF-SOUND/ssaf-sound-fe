import type { IconNames } from '~/components/Common';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { Dot, Icon, IconButton } from '~/components/Common';
import { useMyInfo } from '~/services/member';
import { flex } from '~/styles/utils';
import { getPathname, routes, webStorage } from '~/utils';

export const PrivateButtonsLayer = () => {
  const { data: myInfo } = useMyInfo();
  const router = useRouter();
  const isSignedIn = !!myInfo;

  const onClickSignInButton = () => {
    webStorage.setSignInReturnPage(getPathname());
    router.push(routes.signIn());
  };

  return (
    <div css={privateButtonLayerSelfCss}>
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
        </>
      ) : (
        <PrivateButton
          onClick={onClickSignInButton}
          iconName="signIn"
          label="로그인"
          hasUnreadMessage={false}
        />
      )}
    </div>
  );
};

const iconSize = 28;
const iconContainerGap = 4;
const iconContainerWidth = iconSize + iconContainerGap + 10;

interface PrivateButtonProps {
  iconName: IconNames;
  label: string;
  hasUnreadMessage?: boolean;
  onClick: () => void;
}

const PrivateButton = (props: PrivateButtonProps) => {
  const { iconName, hasUnreadMessage = false, label, onClick } = props;

  return (
    <div css={privateButtonSelfCss}>
      <div css={unreadMessageIndicatorCss}>
        {hasUnreadMessage && <Dot size="sm" theme="recruit" />}
      </div>
      <IconButton onClick={onClick} size={iconSize + 4}>
        <Icon name={iconName} size={iconSize} label={label} />
      </IconButton>
    </div>
  );
};

const privateButtonLayerSelfCss = css(flex('center', '', 'row', 10));
const privateButtonSelfCss = css(
  { minWidth: iconContainerWidth },
  flex('center', 'flex-end', 'row', iconContainerGap)
);

const unreadMessageIndicatorCss = css({ width: 10 }, flex('center', 'center'));