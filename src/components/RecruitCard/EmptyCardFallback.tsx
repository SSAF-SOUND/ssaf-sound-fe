import type { RecruitCategory } from '~/services/recruit';

import Link from 'next/link';

import { getRecruitThemeByCategory } from '~/services/recruit';
import { flex, fontCss } from '~/styles/utils';
import { routes } from '~/utils';

import { SsafyIcon, TrackSize, Button } from '../Common';

export const EmptyCardFallback = ({
  category = 'project',
}: {
  category: RecruitCategory;
}) => {
  return (
    <div css={flex('center', '', 'column', 30)}>
      <div css={{ height: 20 }} />
      {/*<SsafyIcon.Track*/}
      {/*  size={TrackSize.LG2}*/}
      {/*  theme={getRecruitThemeByCategory(category)}*/}
      {/*/>*/}
      <div
        css={[
          flex('center', '', 'column'),
          {
            '> *': fontCss.style.B20,
          },
        ]}
      >
        <p>해당 조건에 맞는 리쿠르팅이 존재하지 않아요.</p>
        <p>새로운 리쿠르팅을 작성해보시겠어요?</p>
      </div>
      {/*<Button theme={getRecruitThemeByCategory(category)}>*/}
      {/*  <Link href={routes.recruit.new()}>리쿠르팅 작성하기</Link>*/}
      {/*</Button>*/}
    </div>
  );
};
