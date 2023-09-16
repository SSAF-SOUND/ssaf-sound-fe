import type { UserInfo } from '~/services/member';

import { css } from '@emotion/react';

import { Button, Icon, IconButton, Modal } from '~/components/Common';
import SquareAvatar from '~/components/SquareAvatar';
import { useAsyncState } from '~/hooks';
import { flex, fontCss, palettes, position, Theme } from '~/styles/utils';
import { noop } from '~/utils';

interface RecruitParticipantDetailProps {
  userInfo: UserInfo;
  showPrivateButtons?: boolean;
  onClickClose?: () => void;
  onClickUserProfileLink?: () => void;
  onClickRecruitApplicationLink?: () => void;
  onClickExcludeRecruitParticipant?: () => void;
}

export const RecruitParticipantDetail = (
  props: RecruitParticipantDetailProps
) => {
  const {
    userInfo,
    showPrivateButtons = false,
    onClickClose,
    onClickUserProfileLink,
    onClickRecruitApplicationLink,
    onClickExcludeRecruitParticipant = noop,
  } = props;

  const {
    loading: isExcludingRecruitParticipant,
    handleAsync: handleExcludeRecruitParticipant,
  } = useAsyncState(onClickExcludeRecruitParticipant);

  return (
    <div css={selfCss}>
      <div css={{ textAlign: 'right', marginBottom: 6 }}>
        <Modal.Close onClick={onClickClose} asChild>
          <IconButton size={32}>
            <Icon name="close" size={28} />
          </IconButton>
        </Modal.Close>
      </div>

      <div>
        <time css={joinDateCss}>[날짜]에 멤버가 되었습니다.</time>

        <div css={{ marginBottom: 16 }}>
          <SquareAvatar style={{ width: '100%' }} userInfo={userInfo} />
        </div>

        <div css={buttonGroupCss}>
          <Button
            css={[{ backgroundColor: palettes.primary.light }, buttonCss]}
            size="md"
            theme={Theme.PRIMARY}
            onClick={onClickUserProfileLink}
          >
            프로필 보러가기
          </Button>

          {showPrivateButtons && (
            <>
              <Button
                css={[{ backgroundColor: palettes.primary.light }, buttonCss]}
                size="md"
                theme={Theme.PRIMARY}
                onClick={onClickRecruitApplicationLink}
              >
                지원서 보러가기
              </Button>

              <Button
                size="md"
                theme={Theme.PRIMARY}
                css={buttonCss}
                loading={isExcludingRecruitParticipant}
                onClick={handleExcludeRecruitParticipant}
              >
                멤버 제외하기
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const selfCss = css(
  {
    backgroundColor: palettes.background.grey,
    width: 230,
    padding: 20,
    borderRadius: 20,
  },
  position.xy('center', 'center', 'fixed')
);

const joinDateCss = css(
  {
    color: palettes.font.blueGrey,
  },
  fontCss.style.R12
);

const buttonGroupCss = css(flex('', '', 'column', 6));
const buttonCss = css(fontCss.style.B12);
