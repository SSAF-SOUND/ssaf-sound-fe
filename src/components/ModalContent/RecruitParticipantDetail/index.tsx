import type { UserInfo } from '~/services/member';
import type {
  RecruitDetail,
  RecruitParticipantUserInfo,
} from '~/services/recruit';

import Link from 'next/link';

import { css } from '@emotion/react';

import { Button } from '~/components/Common/Button';
import { Icon } from '~/components/Common/Icon';
import { IconButton } from '~/components/Common/IconButton';
import { Modal } from '~/components/Common/Modal';
import { FullDateTime } from '~/components/FullDateTime';
import { Alert } from '~/components/ModalContent';
import SquareAvatar from '~/components/SquareAvatar';
import { useExcludeRecruitParticipant } from '~/services/recruit/hooks/useExcludeRecruitParticipant';
import { flex, fontCss, palettes, position, Theme } from '~/styles/utils';
import { handleAxiosError, routes } from '~/utils';

interface RecruitParticipantDetailProps {
  recruitDetail: RecruitDetail;
  userInfo: RecruitParticipantUserInfo;
  onClickClose?: () => void;
}

export const RecruitParticipantDetail = (
  props: RecruitParticipantDetailProps
) => {
  const { recruitDetail, userInfo: targetUserInfo, onClickClose } = props;
  const { joinedAt, recruitApplicationId } = targetUserInfo;
  const { author, mine, recruitId } = recruitDetail;
  const {
    mutateAsync: excludeRecruitParticipant,
    isLoading: isExcludingRecruitParticipant,
  } = useExcludeRecruitParticipant(recruitId);
  const isRecruitAuthor = author.memberId === targetUserInfo.memberId;
  const showPrivateButtons = mine;

  const handleExcludeRecruitParticipant = async () => {
    try {
      await excludeRecruitParticipant(recruitApplicationId);
    } catch (err) {
      handleAxiosError(err);
    }
  };

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
        <header css={[headerCss, { marginBottom: 4 }]}>
          {isRecruitAuthor ? (
            <p>리쿠르팅 모집자입니다.</p>
          ) : (
            <FullDateTime
              dateTimeString={joinedAt}
              suffix={'에 멤버가 되었습니다.'}
            />
          )}
        </header>

        <div css={{ marginBottom: 16 }}>
          <SquareAvatar style={{ width: '100%' }} userInfo={targetUserInfo} />
        </div>

        <div css={buttonGroupCss}>
          <Button
            css={[{ backgroundColor: palettes.primary.light }, buttonCss]}
            size="md"
            theme={Theme.PRIMARY}
            asChild
          >
            <Link
              onClick={onClickClose}
              href={routes.profile.detail(targetUserInfo.memberId)}
            >
              프로필 보러가기
            </Link>
          </Button>

          {!isRecruitAuthor && showPrivateButtons && (
            <>
              {
                <Button
                  css={[{ backgroundColor: palettes.primary.light }, buttonCss]}
                  size="md"
                  theme={Theme.PRIMARY}
                  asChild
                >
                  <Link
                    onClick={onClickClose}
                    href={routes.recruit.applications.detail({
                      recruitId,
                      recruitApplicationId,
                    })}
                  >
                    지원서 보러가기
                  </Link>
                </Button>
              }

              <RecruitParticipantExcludeButton
                userInfo={targetUserInfo}
                isButtonLoading={isExcludingRecruitParticipant}
                handleExcludeRecruitParticipant={
                  handleExcludeRecruitParticipant
                }
              />
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
const headerCss = css(fontCss.style.R12, { color: palettes.font.blueGrey });

interface RecruitParticipantExcludeButtonProps {
  userInfo: UserInfo;
  isButtonLoading?: boolean;
  handleExcludeRecruitParticipant?: () => void;
}

const RecruitParticipantExcludeButton = (
  props: RecruitParticipantExcludeButtonProps
) => {
  const { userInfo, isButtonLoading, handleExcludeRecruitParticipant } = props;

  const alertDescription = `${userInfo.nickname}님을 리쿠르팅 멤버에서 제외합니다.`;

  return (
    <Modal
      trigger={
        <Button
          size="md"
          theme={Theme.PRIMARY}
          css={buttonCss}
          loading={isButtonLoading}
        >
          멤버 제외하기
        </Button>
      }
      content={
        <Alert
          actionText="제외"
          cancelText="취소"
          title="알림"
          description={alertDescription}
          onClickAction={handleExcludeRecruitParticipant}
        />
      }
    />
  );
};
