import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next/types';
import type { recruitMembersType } from '~/services/recruit';

import { useRouter } from 'next/router';

import ArticleContent from '~/components/Article/ArticleContent';
import { DefaultFullPageLoader, Icon, PageHead } from '~/components/Common';
import Dday from '~/components/Dday';
import { RecruitLayout } from '~/components/Layout';
import Name from '~/components/Name';
import {
  RecruitBookMark,
  RecruitButtons,
  RecruitTabs,
  ViewNumber,
} from '~/components/Recruit';
import { RecruitMeta as RecruitMetaComponent } from '~/components/RecruitMeta';
import { RecruitMetaTitle } from '~/components/RecruitMeta/RecruitMetaTitle';
import SquareAvatar from '~/components/SquareAvatar';
import TitleBar from '~/components/TitleBar';
import { useGetQueryString } from '~/hooks';
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
  const {
    data: recruitDetailData,
    isLoading: isDetailLoading,
    isError: isDetailError,
  } = useRecruitDetail(props.recruitId);
  const {
    data: recruitMembersData,
    isLoading: isMembersLoading,
    isError: isMembersError,
  } = useRecruitMembers(props.recruitId);

  const router = useRouter();
  const info = useGetQueryString('info');

  if (isDetailLoading || isMembersLoading) return <DefaultFullPageLoader />;
  if (isDetailError || isMembersError) {
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
    limits,
    skills,
    scrapCount,
    author,
    // -------
    // createdAt,
    // modifiedAt,
    // deletedRecruit,
    // finishedRecruit,
  } = recruitDetailData;
  const parsedMembersData = recruitMembersData.recruitTypes['앱'];
  // 이부분 로직이 바껴서, 일단 냅둘게요!
  // 사용하시려면 members Data 렌더링 부분 꼭 수정하셔야해요!

  const recruitMeta = {
    recruitStart,
    recruitEnd,
    limits,
    skills,
  };

  const isQueryRecruitInfo = info === 'recruitInfo';
  return (
    <RecruitLayout>
      <PageHead
        title={title}
        description={content}
        openGraph={{
          title: title,
          // description: metaDescription,
          url: routes.recruit.detail(props.recruitId),
        }}
      />

      <TitleBar.Default
        css={fontCss.style.B16}
        title={'리쿠르팅 상세 내역'}
        onClickBackward={routes.recruit.self()}
        withoutClose
      />

      <Dday recruitEnd="2022-03-01" category={category} />
      <ViewNumber view={view} />

      <div css={flex()}>
        <RecruitMetaTitle title={title} />
        <Name userInfo={author} size="md" />
      </div>
      <div css={{ height: 20 }} />

      <RecruitMetaComponent
        title={title}
        recruitMeta={recruitMeta}
        userInfo={author}
        expanded={false}
      />

      <div css={{ height: 20 }} />

      <div css={flex('center', '', 'row', 6)}>
        <RecruitBookMark
          recruitDetail={recruitDetailData}
          recruitId={props.recruitId}
          category={category}
        />
        {/* share 기능 없음, 클립보드 복사인지 궁금 */}
        <Icon name="share" size={20} />
      </div>
      <div css={{ height: 20 }} />

      <RecruitButtons category={category} recruitId={props.recruitId} />
      <RecruitTabs category={category} />

      <div
        css={{
          padding: '30px 0',
        }}
      >
        {!isQueryRecruitInfo && <ArticleContent html={content} />}
        {/* 
        {isQueryRecruitInfo && (
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
        )} */}
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
