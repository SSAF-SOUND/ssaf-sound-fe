import type { RecruitParticipantUserInfo } from '~/services/recruit';

import { css } from '@emotion/react';

import { Button, Icon, IconButton, Modal } from '~/components/Common';
import { FullDateTime } from '~/components/FullDateTime';
import SquareAvatar from '~/components/SquareAvatar';
import { useAsyncState } from '~/hooks';
import { flex, fontCss, palettes, position, Theme } from '~/styles/utils';
import { noop } from '~/utils';

interface RecruitParticipantDetailProps {
  userInfo: RecruitParticipantUserInfo;
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
  const { joinedAt } = userInfo;

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
        <div>
          <FullDateTime
            dateTimeString={joinedAt}
            suffix={'에 멤버가 되었습니다.'}
          />
        </div>

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
    minWidth: 280,
    padding: 20,
    borderRadius: 20,
  },
  position.xy('center', 'center', 'fixed')
);

const buttonGroupCss = css(flex('', '', 'column', 6));
const buttonCss = css(fontCss.style.B12);
