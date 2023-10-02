import type { RecruitApplicant, RecruitParts } from '~/services/recruit';

import Link from 'next/link';

import { css } from '@emotion/react';
import { memo } from 'react';

import { Avatar } from '~/components/Common/Avatar';
import { Icon } from '~/components/Common/Icon';
import { IconButton } from '~/components/Common/IconButton';
import { FullDateTime } from '~/components/FullDateTime';
import { RecruitApplicantLikeButton } from '~/components/RecruitApplicants/RecruitApplicantBar/RecruitApplicantLikeButton';
import { useLikeRecruitApplication } from '~/services/recruit';
import {
  colorMix,
  flex,
  fontCss,
  inlineFlex,
  lineClamp,
  palettes,
} from '~/styles/utils';
import { handleAxiosError, routes } from '~/utils';

export interface RecruitApplicantBarProps {
  recruitPart?: RecruitParts;
  recruitId: number;
  applicant: RecruitApplicant;
  withLikeButton?: boolean;
}

export const RecruitApplicantBar = memo((props: RecruitApplicantBarProps) => {
  const { applicant, recruitId, recruitPart, withLikeButton = true } = props;

  const { author, liked, appliedAt, reply, recruitApplicationId } = applicant;

  const {
    mutateAsync: likeRecruitApplication,
    isLoading: isLikingRecruitApplication,
  } = useLikeRecruitApplication({
    recruitId,
    recruitApplicationId,
    recruitPart,
  });

  const { nickname } = author;

  const onLikedChange = async () => {
    try {
      await likeRecruitApplication();
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <li css={[selfCss, isLikingRecruitApplication && likingSelfCss]}>
      {withLikeButton && (
        <div css={applicantHeaderCss}>
          <RecruitApplicantLikeButton
            liked={liked}
            loading={isLikingRecruitApplication}
            onLikedChange={onLikedChange}
          />
        </div>
      )}

      <div css={applicantInfoContainerCss}>
        <Avatar size="lg" css={{ flexShrink: 0 }} userInfo={author} />

        <div css={applicantInfoDetailContainerCss}>
          <div css={applicantInfoDetailCss}>
            <div css={applicantInfoDescriptionCss}>
              <p css={applicantInfoDescriptionHeaderCss}>
                {nickname}님의 리쿠르팅 신청
              </p>
              <p css={applicantInfoDescriptionReplyCss}>{reply}</p>
            </div>

            <div css={applicantInfoLinkCss}>
              {/* <Dot theme="recruit" /> */}
              <IconButton size={32} asChild>
                <Link
                  href={routes.recruit.applications.detail({
                    recruitId,
                    recruitApplicationId,
                  })}
                >
                  <Icon name="chevron.right" size={24} />
                </Link>
              </IconButton>
            </div>
          </div>

          <FullDateTime dateTimeString={appliedAt} />
        </div>
      </div>
    </li>
  );
});

RecruitApplicantBar.displayName = 'RecruitApplicantBar';

const selfCss = css(
  {
    borderRadius: 8,
    transition: 'background-color 400ms',
  },
  flex('center', '', 'row', 10)
);
const applicantHeaderCss = css(
  { width: 46, flexShrink: 0 },
  inlineFlex('center', 'center')
);
const likingSelfCss = css({
  backgroundColor: colorMix('20%', palettes.recruit.default),
});

const applicantInfoContainerCss = css(
  { width: '100%' },
  flex('center', '', 'row', 16)
);
const applicantInfoDetailContainerCss = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 100%)',
  gridTemplateRows: 'auto',
  gridAutoRows: 'auto',
  width: '100%',
  rowGap: 6,
});
const applicantInfoDetailCss = css(flex('center', 'space-between', 'row', 12));

const applicantInfoDescriptionCss = css({
  // 내부 콘텐츠의 text `ellipsis`를 위해서 필요
  // `break`되지 않으면 `ellipsis`가 보이지 않음.
  overflow: 'hidden',
  wordBreak: 'break-word',
});

const applicantInfoDescriptionHeaderCss = css(
  fontCss.family.auto,
  fontCss.style.B16,
  lineClamp(1)
);

const applicantInfoDescriptionReplyCss = css(
  fontCss.family.auto,
  fontCss.style.B12,
  lineClamp(1)
);

const applicantInfoLinkCss = css({}, flex('center', '', 'row', 6));
