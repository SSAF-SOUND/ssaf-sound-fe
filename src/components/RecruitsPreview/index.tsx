import { css } from '@emotion/react';

import { PreviewErrorCard } from '~/components/PreviewErrorCard';
import { RecruitCardSkeleton } from '~/components/Recruit/RecruitCard/RecruitCardSkeleton';
import { RecruitsPreviewRecruitList } from '~/components/RecruitsPreview/RecruitsPreviewRecruitList';
import { recruitPreviewMarginForExpandCssVar } from '~/components/RecruitsPreview/utils';
import TitleBar from '~/components/TitleBar';
import {
  defaultRecruitsPageSize,
  useRecruitsByOffset,
} from '~/services/recruit';
import { flex } from '~/styles/utils';
import { routes } from '~/utils';

interface RecruitsPreviewProps {
  className?: string;
  marginForExpand?: string;
}

const maxViewCount = defaultRecruitsPageSize;
export const RecruitsPreview = (props: RecruitsPreviewProps) => {
  const { className, marginForExpand = '0px' } = props;
  const {
    data: recruits,
    isLoading: isRecruitsLoading,
    isError: isRecruitsError,
    isSuccess: isRecruitsSuccess,
  } = useRecruitsByOffset();

  const latestRecruits = recruits?.recruits.slice(0, maxViewCount) ?? [];
  const notExistRecruits = latestRecruits.length === 0;

  const style = {
    [recruitPreviewMarginForExpandCssVar.varName]: marginForExpand,
  };

  return (
    <div className={className} style={style}>
      <TitleBar.Preview
        title="리쿠르팅"
        moreLinkRoute={routes.recruit.self()}
        css={{ marginBottom: 16 }}
      />

      {isRecruitsLoading && <RecruitsPreviewSkeleton />}
      {isRecruitsError && (
        <PreviewErrorCard
          css={{ height: 226 }}
          errorMessage={`리쿠르팅 목록을 불러오는 중 오류가 발생했습니다.`}
        />
      )}
      {isRecruitsSuccess &&
        (notExistRecruits ? (
          <NotExistRecruits />
        ) : (
          <RecruitsPreviewRecruitList recruits={latestRecruits} />
        ))}
    </div>
  );
};

const NotExistRecruits = () => {
  return <div css={notExistRecruitsCss}>아직 리쿠르팅이 없습니다.</div>;
};

const notExistRecruitsCss = css(
  {
    width: '100%',
    height: 170,
  },
  flex('center', 'center', 'column')
);

const RecruitsPreviewSkeleton = () => {
  return (
    <div>
      <div css={[flex('', 'flex-end', 'row', 12), { marginBottom: 46 }]} />
      <div css={recruitsPreviewSkeletonCss}>
        <RecruitCardSkeleton size="sm" />
        <RecruitCardSkeleton size="sm" />
        <RecruitCardSkeleton size="sm" />
        <RecruitCardSkeleton size="sm" />
      </div>
    </div>
  );
};
const recruitsPreviewSkeletonCss = css(
  { height: 180 },
  flex('center', '', 'row', 16)
);
