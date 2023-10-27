import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next/types';
import type { ArticleCommentFormProps } from '~/components/Forms/ArticleCommentForm';

import { css } from '@emotion/react';
import { QueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import ArticleComment from '~/components/ArticleComment';
import { BreadCrumbs } from '~/components/BreadCrumbs';
import { FullPageLoader, loaderText } from '~/components/Common/FullPageLoader';
import { PageHead } from '~/components/Common/PageHead';
import { Footer } from '~/components/Footer';
import ArticleCommentForm from '~/components/Forms/ArticleCommentForm';
import { RecruitDetailLayout } from '~/components/Layout';
import { Recruit } from '~/components/Recruit/Recruit';
import RedirectionGuide from '~/components/RedirectionGuide';
import TitleBar from '~/components/TitleBar';
import { queryKeys } from '~/react-query/common';
import { dehydrate, prefetch } from '~/react-query/server';
import { useMyInfo } from '~/services/member';
import {
  getDisplayCategoryName,
  getRecruitDetail,
  getRecruitThemeByCategory,
  RecruitCategoryName,
  useRecruitDetail,
} from '~/services/recruit';
import {
  useCreateRecruitComment,
  useInvalidateRecruitComments,
  useRecruitComments,
} from '~/services/recruitComment';
import { expandCss, flex, fontCss, palettes } from '~/styles/utils';
import {
  createAxiosCookieConfig,
  ErrorMessage,
  getErrorResponse,
  handleAxiosError,
  notFoundPage,
  ResponseCode,
  routes,
} from '~/utils';
import { stripHtmlTags } from '~/utils/stripHtmlTags';

interface RecruitDetailPageProps
  extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const RecruitDetailPage = (props: RecruitDetailPageProps) => {
  const { recruitId } = props;

  const {
    data: recruitDetail,
    isLoading: isRecruitDetailLoading,
    isError: isRecruitDetailError,
    error: recruitDetailError,
  } = useRecruitDetail(recruitId);

  if (isRecruitDetailLoading) {
    return <FullPageLoader text={loaderText.loadingData} />;
  }

  if (isRecruitDetailError) {
    const errorResponse = getErrorResponse(recruitDetailError);

    const errorMessage = errorResponse?.message ?? ErrorMessage.LOADING_ERROR;

    return (
      <RedirectionGuide
        title="Error"
        description={errorMessage}
        redirectionText={'리쿠르팅 목록으로 이동'}
        redirectionTo={routes.recruit.self()}
      />
    );
  }

  const { category, title, content } = recruitDetail;
  const titleBarTitle = getDisplayCategoryName(category);
  const recruitTheme = getRecruitThemeByCategory(category);

  const metaTitle = title;
  const metaDescription = stripHtmlTags(content).slice(0, 100);
  const pageUrl = routes.recruit.detail(recruitId).pathname;

  return (
    <>
      <PageHead
        title={metaTitle}
        description={metaDescription}
        openGraph={{
          title: metaTitle,
          description: metaDescription,
          url: pageUrl,
        }}
      />

      <RecruitDetailLayout>
        <TitleBar.Default
          css={{ marginBottom: 12 }}
          title={titleBarTitle}
          withoutClose
          footer={
            <BreadCrumbs
              entries={[
                {
                  name: '리쿠르팅 조회',
                  link: routes.recruit.list({ category }),
                },
                {
                  name: '리쿠르팅 상세',
                  link: routes.recruit.detail(recruitId),
                  active: true,
                },
              ]}
            />
          }
        />

        <div css={{ marginBottom: 40 }}>
          <Recruit.Header
            css={{ marginBottom: 20 }}
            recruitDetail={recruitDetail}
          />

          <Recruit.BasicInfo
            css={[pageExpandCss, { marginBottom: 20 }]}
            recruitDetail={recruitDetail}
          />

          <Recruit.Stats recruitDetail={recruitDetail} />
        </div>

        <Recruit.Links
          css={{ marginBottom: 60 }}
          recruitDetail={recruitDetail}
        />

        <Recruit.Tabs.Root
          css={{ marginBottom: 50 }}
          theme={recruitTheme}
          descriptionText={getDescriptionTabText(category)}
        >
          <Recruit.Tabs.DescriptionContent html={content} />

          <Recruit.Tabs.ParticipantsContent
            recruitId={recruitId}
            recruitDetail={recruitDetail}
          />
        </Recruit.Tabs.Root>

        <div css={separatorCss} />

        <RecruitCommentsLayer
          recruitId={recruitId}
          css={{ marginBottom: 40 }}
        />

        <RecruitCommentFormLayer recruitId={recruitId} />
      </RecruitDetailLayout>

      <Footer />
    </>
  );
};

const getDescriptionTabText = (category: RecruitCategoryName) => {
  if (category === RecruitCategoryName.PROJECT) return '프로젝트 설명';
  if (category === RecruitCategoryName.STUDY) return '스터디 설명';
  throw new Error(
    `잘못된 카테고리가 전달되었습니다. \n> category: ${category}`
  );
};

const pageExpandCss = expandCss();
const separatorCss = css(pageExpandCss, {
  marginBottom: 44,
  height: 20,
  backgroundColor: palettes.background.grey,
});

export default RecruitDetailPage;

const RecruitCommentsLayer = (props: {
  recruitId: number;
  className?: string;
}) => {
  const { recruitId, className } = props;
  const skeletonCount = 8;
  const {
    data: comments,
    isLoading,
    isSuccess,
  } = useRecruitComments(recruitId);

  return (
    <div css={commentsLayerSelfCss} className={className}>
      <h3 css={fontCss.style.B20}>Q&A</h3>

      {isLoading && (
        <Skeleton
          count={skeletonCount}
          height={120}
          style={{ marginBottom: 20 }}
          baseColor={palettes.background.grey}
          enableAnimation={false}
        />
      )}

      {isSuccess &&
        comments.map((comment) => {
          return (
            <ArticleComment
              key={comment.commentId}
              articleId={recruitId}
              comment={comment}
              isRecruitComment={true}
            />
          );
        })}
    </div>
  );
};

const commentsLayerSelfCss = css(flex('', '', 'column', 20));

const RecruitCommentFormLayer = (props: { recruitId: number }) => {
  const { recruitId } = props;
  const { data: myInfo } = useMyInfo();
  const { mutateAsync: createRecruitComment } =
    useCreateRecruitComment(recruitId);
  const [formKey, setFormKey] = useState(1);

  const invalidateComments = useInvalidateRecruitComments(recruitId);
  const isSignedIn = !!myInfo;

  const onValidSubmit: ArticleCommentFormProps['onValidSubmit'] = async (
    _,
    formValues
  ) => {
    try {
      await createRecruitComment(formValues);
      await invalidateComments();
      setFormKey((p) => p + 1);
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <ArticleCommentForm
      onValidSubmit={onValidSubmit}
      key={formKey}
      options={{ showNotSignedInFallback: !isSignedIn, showAnonymous: false }}
    />
  );
};

/* ssr */

interface Props {
  recruitId: number;
}

type Params = {
  recruitId: string;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const recruitId = Number(context.params?.recruitId);

  if (Number.isNaN(recruitId)) {
    return notFoundPage;
  }

  const queryClient = new QueryClient();
  try {
    await queryClient.fetchQuery({
      queryKey: queryKeys.recruit.detail(recruitId),
      queryFn: () =>
        getRecruitDetail(recruitId, {
          publicRequest: true, // 요청은 Private 이지만, 자동 재발급 프로세스를 막기 위해 publicRequest 사용
          config: createAxiosCookieConfig(context.req.headers.cookie),
        }),
    });
  } catch (err) {
    const errorResponse = getErrorResponse(err);
    if (errorResponse?.code === ResponseCode.RESOURCE_NOT_FOUND) {
      return notFoundPage;
    }
  }

  const { dehydratedState } = dehydrate(queryClient);

  return {
    props: {
      recruitId,
      dehydratedState,
    },
  };
};
