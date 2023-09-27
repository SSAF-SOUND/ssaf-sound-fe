import type {
  RecruitDetail,
  RecruitParticipantUserInfo,
} from '~/services/recruit';

import { css } from '@emotion/react';
import { memo } from 'react';
import Skeleton from 'react-loading-skeleton';

import { ErrorMessageWithSsafyIcon } from '~/components/ErrorMessageWithSsafyIcon';
import { useModal } from '~/components/GlobalModal';
import SquareAvatar from '~/components/SquareAvatar';
import { RecruitParts, useRecruitParticipants } from '~/services/recruit';
import { flex, fontCss, palettes, resetStyle } from '~/styles/utils';

interface RecruitParticipantsProgressDetailProps {
  recruitId: number;
  recruitDetail: RecruitDetail;
}

export const RecruitParticipantsProgressDetail = memo(
  (props: RecruitParticipantsProgressDetailProps) => {
    const { recruitId, recruitDetail } = props;
    const { openModal, closeModal } = useModal();

    const {
      data: recruitParticipants,
      isLoading: isRecruitParticipantsLoading,
      isError: isRecruitParticipantsError,
      error: recruitParticipantsError,
    } = useRecruitParticipants(recruitId);

    if (isRecruitParticipantsLoading) {
      return <RecruitParticipantsProgressDetailSkeleton />;
    }

    if (isRecruitParticipantsError) {
      return (
        <ErrorMessageWithSsafyIcon
          css={{ padding: '100px 0' }}
          error={recruitParticipantsError}
        />
      );
    }

    const handleOpenRecruitParticipantDetailModal = (
      targetUserInfo: RecruitParticipantUserInfo
    ) => {
      openModal('recruitParticipantDetail', {
        recruitDetail: recruitDetail,
        userInfo: targetUserInfo,
        onClickClose: closeModal,
      });
    };

    return (
      <div>
        <RecruitParticipantsProgressDetailHeader css={{ marginBottom: 40 }} />

        {Object.entries(recruitParticipants).map(
          ([part, { members, limit: maxParticipantsCount }]) => {
            const currentParticipantsCount = members.length;
            const requiredCount =
              maxParticipantsCount - currentParticipantsCount;

            return (
              <div key={part} css={{ marginBottom: 40 }}>
                {part !== RecruitParts.STUDY && (
                  <h3 css={[fontCss.style.B16, { marginBottom: 12 }]}>
                    {part}
                  </h3>
                )}

                <ul css={flex('center', '', 'row', 12, 'wrap')}>
                  {members.map((userInfo) => (
                    <li key={userInfo.memberId}>
                      <button
                        type="button"
                        css={avatarButtonCss}
                        onClick={() =>
                          handleOpenRecruitParticipantDetailModal(userInfo)
                        }
                      >
                        <SquareAvatar userInfo={userInfo} />
                      </button>
                    </li>
                  ))}
                  {Array(requiredCount)
                    .fill(undefined)
                    .map((_, index) => (
                      <li key={index}>
                        <SquareAvatar />
                      </li>
                    ))}
                </ul>
              </div>
            );
          }
        )}
      </div>
    );
  }
);

const avatarButtonCss = css(resetStyle.button(), {
  borderRadius: 8,
  '&:focus-visible': {
    outline: `3px solid ${palettes.primary.default}`,
  },
});

RecruitParticipantsProgressDetail.displayName =
  'RecruitParticipantsProgressDetail';

const RecruitParticipantsProgressDetailSkeleton = () => {
  const skeletonCount = 2;

  return (
    <div>
      {Array(skeletonCount)
        .fill(undefined)
        .map((_, index) => (
          <div key={index} css={{ marginBottom: 36 }}>
            <Skeleton
              style={{ marginBottom: 12 }}
              baseColor={palettes.background.grey}
              enableAnimation={false}
              width={100}
              height={30}
            />

            <Skeleton
              style={{ marginRight: 16, marginBottom: 16 }}
              inline
              baseColor={palettes.background.grey}
              enableAnimation={false}
              width={110}
              height={110}
              count={6}
            />
          </div>
        ))}
    </div>
  );
};

interface RecruitParticipantsProgressDetailHeaderProps {
  className?: string;
}

const RecruitParticipantsProgressDetailHeader = (
  props: RecruitParticipantsProgressDetailHeaderProps
) => {
  return (
    <div css={flex('center', 'center', 'row', 8)} {...props}>
      <div css={boxCss(palettes.majorDark)}>전공자</div>
      <div css={boxCss(palettes.nonMajorDark)}>비전공자</div>
    </div>
  );
};

const boxCss = (backgroundColor: string) =>
  css(
    {
      width: 60,
      height: 60,
      backgroundColor,
      borderRadius: 10,
    },
    fontCss.style.B12,
    flex('center', 'center')
  );
