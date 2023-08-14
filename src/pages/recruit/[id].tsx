import type { GetServerSideProps } from 'next/types';
import type { RecruitDetail, recruitMembersType } from '~/services/recruit';

import { useRouter } from 'next/router';

import { QueryClient } from '@tanstack/react-query';

import Dday from '~/components/Dday';
import { RecruitLayout } from '~/components/Layout';
import Name from '~/components/Name';
import { RecruitButtons, RecruitTabs } from '~/components/Recruit';
import { ViewNumber } from '~/components/Recruit';
import RecruitMeta from '~/components/RecruitMeta';
import { RecruitMetaTitle } from '~/components/RecruitMeta/RecruitMetaTitle';
import SquareAvatar from '~/components/SquareAvatar';
import TitleBar from '~/components/TitleBar';
import { queryKeys } from '~/react-query/common';
import { recruitAPI } from '~/services/recruit';
import { flex, fontCss } from '~/styles/utils';
import { paramsToNumber, routes } from '~/utils';

interface RecruitDetailPageProps {
  data: RecruitDetail;
  membersData: recruitMembersType;
}
const RecruitDetailPage = (props: RecruitDetailPageProps) => {
  const { data, membersData } = props;
  const {
    category,
    title,
    recruitStart,
    recruitEnd,
    content,
    view,
    userInfo,
    limits,
    skills,
    scrapCount,
    // -------
    createdAt,
    modifiedAt,
    deletedRecruit,
    finishedRecruit,
  } = data;

  const ParsedMembersData = Object.values(membersData)
    .map((v) => Object.values(v))
    .flat();

  const totalLimit = ParsedMembersData.reduce((acc, cur) => acc + cur.limit, 0);
  const recruitedMembers = ParsedMembersData.map((v) => v.members).flat();

  const { query } = useRouter();

  const recruitMeta = {
    recruitStart,
    recruitEnd,
    limits,
    skills,
  };

  return (
    <RecruitLayout>
      <TitleBar.Default
        css={fontCss.style.B16}
        title={'리쿠르팅 상세 내역'}
        onClickBackward={routes.main()}
        withoutClose
      />

      <Dday recruitEnd="2022-03-01" category={category} />
      <ViewNumber view={view} />

      <div
        css={
          (flex(),
          {
            marginBottom: 20,
          })
        }
      >
        <RecruitMetaTitle title={title} />
        <Name userInfo={userInfo} size="md" />
      </div>

      <div css={{ marginBottom: 20 }}>
        <RecruitMeta
          title={title}
          recruitMeta={recruitMeta}
          userInfo={userInfo}
          expanded={false}
        />
      </div>

      <div css={{ marginBottom: 20 }}>
        <span>북마크 {scrapCount}</span>
      </div>

      <RecruitButtons />

      <RecruitTabs />

      <div
        css={{
          padding: '30px 0',
        }}
      >
        {(!query?.info || query?.info === 'projectInfo') && (
          <article>{content}</article>
        )}

        {query?.info === 'recruitInfo' && (
          <div css={flex('center', '', 'row', 8, 'wrap')}>
            {recruitedMembers.map((v) => {
              return <SquareAvatar userInfo={v} key={v.memberId} />;
            })}
            {new Array(totalLimit - recruitedMembers.length)
              .fill(undefined)
              .map((_, i) => (
                <SquareAvatar key={i} />
              ))}
          </div>
        )}
      </div>
    </RecruitLayout>
  );
};

export default RecruitDetailPage;

export const getServerSideProps: GetServerSideProps<
  RecruitDetailPageProps
> = async ({ params }) => {
  const queryClient = new QueryClient();

  const Id = paramsToNumber(params?.id);
  const recruitDetailQueryKeys = queryKeys.recruit.detail(Id);

  try {
    const data = await queryClient.fetchQuery({
      queryKey: recruitDetailQueryKeys,
      queryFn: () => recruitAPI.getRecruitDetail(Id),
    });

    const membersData = await queryClient.fetchQuery({
      queryKey: queryKeys.recruit.members(Id),
      queryFn: () => recruitAPI.getRecruitMembers(Id),
    });

    return {
      props: {
        data,
        membersData,
      },
    };
  } catch (err) {
    console.error(err);
    // 추후 수정 예정!
    // 서버에러코드 500만 다룹니다!
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }
};
