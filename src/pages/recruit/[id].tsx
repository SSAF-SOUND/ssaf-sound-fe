import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next/types';
import type { recruitMembersType } from '~/services/recruit';

import { useRouter } from 'next/router';

import Dday from '~/components/Dday';
import { RecruitLayout } from '~/components/Layout';
import Name from '~/components/Name';
import { RecruitButtons, RecruitTabs, ViewNumber } from '~/components/Recruit';
import { RecruitMeta as RecruitMetaComponent } from '~/components/RecruitMeta';
import { RecruitMetaTitle } from '~/components/RecruitMeta/RecruitMetaTitle';
import SquareAvatar from '~/components/SquareAvatar';
import TitleBar from '~/components/TitleBar';
import { queryKeys } from '~/react-query/common';
import { prefetch } from '~/react-query/server';
import {
  recruitAPI,
  useRecruitDetail,
  useRecruitMembers,
} from '~/services/recruit';
import { flex, fontCss } from '~/styles/utils';
import { paramsToNumber, routes } from '~/utils';

const RecruitDetailPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { data: recruitDetailData } = useRecruitDetail(props.recruitId);
  const { data: recruitMembersData } = useRecruitMembers(props.recruitId);
  const router = useRouter();

  if (!recruitDetailData || !recruitMembersData) {
    router.push('/500');
    return;
  }

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
    // createdAt,
    // modifiedAt,
    // deletedRecruit,
    // finishedRecruit,
  } = recruitDetailData;

  const ParsedMembersData = Object.values(
    recruitMembersData as recruitMembersType
  )
    .map((v) => Object.values(v))
    .flat();

  const totalLimit = ParsedMembersData.reduce((acc, cur) => acc + cur.limit, 0);
  const recruitedMembers = ParsedMembersData.map((v) => v.members).flat();

  const { query } = router;

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
        <RecruitMetaComponent
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = paramsToNumber(params?.id);

  const dehydrate = prefetch([
    {
      queryKey: queryKeys.recruit.detail(id),
      queryFn: () => recruitAPI.getRecruitDetail(id),
    },
    {
      queryKey: queryKeys.recruit.members(id),
      queryFn: () => recruitAPI.getRecruitMembers(id),
    },
  ]);

  const dehydratedState = await dehydrate();

  return {
    props: {
      recruitId: id,
      dehydratedState,
    },
  };
};
