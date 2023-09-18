import { css } from '@emotion/react';

import { RecruitsPreviewRecruitList } from '~/components/RecruitsPreview/RecruitsPreviewRecruitList';
import { recruitPreviewMarginForExpandCssVar } from '~/components/RecruitsPreview/utils';
import TitleBar from '~/components/TitleBar';
import { RecruitCategoryName, useRecruits } from '~/services/recruit';
import { flex } from '~/styles/utils';
import { routes } from '~/utils';

interface RecruitsPreviewProps {
  className?: string;
  marginForExpand?: string;
}

const maxViewCount = 10;
export const RecruitsPreview = (props: RecruitsPreviewProps) => {
  const { className, marginForExpand = '0px' } = props;
  const {
    data: recruits,
    isLoading,
    isError,
  } = useRecruits({
    category: RecruitCategoryName.PROJECT,
  });

  const latestRecruits =
    recruits?.pages[0].recruits.slice(0, maxViewCount) ?? [];
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

      {isLoading && <div>로딩중</div>}
      {isError && <div>에러</div>}
      {notExistRecruits ? (
        <NotExistRecruits />
      ) : (
        <RecruitsPreviewRecruitList recruits={latestRecruits} />
      )}
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
