import type { RecruitDetail } from '~/services/recruit';

import { css } from '@emotion/react';

import {
  RecruitIcon,
  RecruitIconButton,
} from '~/components/Recruit/Recruit/RecruitIconButton';
import { useSignInGuideModal } from '~/hooks';
import { countAllComments } from '~/services/comment/utils';
import { useMyInfo } from '~/services/member';
import { getRecruitThemeByCategory, useScrapRecruit } from '~/services/recruit';
import { useRecruitComments } from '~/services/recruitComment';
import { flex, fontCss, inlineFlex, palettes, Theme } from '~/styles/utils';
import { customToast, handleAxiosError } from '~/utils';

interface RecruitStatsProps {
  recruitDetail: RecruitDetail;
  className?: string;
}

export const RecruitStats = (props: RecruitStatsProps) => {
  const { recruitDetail, className } = props;
  const { recruitId, scraped, scrapCount, category } = recruitDetail;

  const { data: myInfo } = useMyInfo();
  const isSignedIn = !!myInfo;
  const { openSignInGuideModal } = useSignInGuideModal();

  const recruitTheme = getRecruitThemeByCategory(category);
  const { data: comments } = useRecruitComments(recruitId);
  const commentCount = comments && countAllComments(comments);
  const { mutateAsync: scrapRecruit, isLoading: isScrapingRecruit } =
    useScrapRecruit(recruitId);

  const copyUrlToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      customToast.success('리쿠르팅 링크가 복사되었습니다.');
    } catch (err) {
      customToast.clientError('리쿠르팅 링크 복사에 실패했습니다.');
    }
  };

  const handleClickScrap = async () => {
    if (!isSignedIn) {
      openSignInGuideModal();
      return;
    }

    try {
      await scrapRecruit();
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <div css={selfCss} className={className}>
      <div css={iconButtonsLayerCss}>
        <div css={bookmarkButtonLayerCss}>
          <RecruitIconButton
            iconName={scraped ? 'bookmark' : 'bookmark.outline'}
            iconColor={palettes.primary.default}
            label="스크랩"
            theme={Theme.PRIMARY}
            onClick={handleClickScrap}
            disabled={isScrapingRecruit}
          />
          <strong>{scrapCount}</strong>
        </div>

        <div>
          <RecruitIconButton
            iconColor={palettes.primary.default}
            iconName="share"
            label="URL 복사"
            theme={Theme.PRIMARY}
            onClick={copyUrlToClipboard}
          />
        </div>
      </div>

      <div css={commentIconLayerCss}>
        <RecruitIcon
          iconName="chat.rect"
          label="댓글"
          color={palettes.secondary.default}
        />
        <strong>{commentCount}</strong>
      </div>
    </div>
  );
};

const selfCss = css(
  { margin: '0 -5px' },
  flex('center', 'space-between', 'row', 24)
);

const iconButtonsLayerCss = css(flex('center', 'flex-start', 'row', 8));

const bookmarkButtonLayerCss = css(
  { color: palettes.primary.default },
  fontCss.style.B16,
  inlineFlex('center', 'flex-start', 'row')
);

const commentIconLayerCss = css(
  { color: palettes.secondary.default },
  fontCss.style.B16,
  flex('center', '', 'row', 6)
);
