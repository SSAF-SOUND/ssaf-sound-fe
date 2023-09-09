import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next/types';
import type { ArticleCommentFormProps } from '~/components/Forms/ArticleCommentForm';

import { css } from '@emotion/react';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import ArticleComment from '~/components/ArticleComment';
import {
  DefaultFullPageLoader,
  loaderText,
  PageHead,
} from '~/components/Common';
import ArticleCommentForm from '~/components/Forms/ArticleCommentForm';
import { RecruitDetailLayout } from '~/components/Layout';
import Name from '~/components/Name';
import { Recruit } from '~/components/Recruit/Recruit';
import { RecruitDeadline } from '~/components/Recruit/RecruitDeadline';
import RedirectionGuide from '~/components/RedirectionGuide';
import TitleBar from '~/components/TitleBar';
import { queryKeys } from '~/react-query/common';
import { prefetch } from '~/react-query/server';
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
import { expandCss, flex, fontCss, inlineFlex, palettes } from '~/styles/utils';
import {
  ErrorMessage,
  getErrorResponse,
  handleAxiosError,
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
    isSuccess: isRecruitDetailSuccess,
  } = useRecruitDetail(recruitId);

  if (isRecruitDetailLoading) {
    return <DefaultFullPageLoader text={loaderText.loadingData} />;
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

  const {
    recruitEnd,
    category,
    view,
    author,
    scraped,
    scrapCount,
    contactURI,

    title,
    content,
  } = recruitDetail;
  const titleBarTitle = getDisplayCategoryName(category);
  const recruitTheme = getRecruitThemeByCategory(category);

  const metaTitle = title;
  const metaDescription = stripHtmlTags(content).slice(0, 100);
  const pageUrl = routes.recruit.detail(recruitId);

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
        />

        <div css={{ marginBottom: 40 }}>
          <div css={[headerCss, { marginBottom: 20 }]}>
            <RecruitDeadline
              endDate={recruitEnd}
              size="md"
              theme={recruitTheme}
            />

            <Recruit.ViewCount>{view}</Recruit.ViewCount>

            <div css={titleLayerCss}>
              <Recruit.Title>{title}</Recruit.Title>
              <Recruit.IconButton iconName="more" label="더보기" />
            </div>

            <Name userInfo={author} size="md" />
          </div>

          <Recruit.BasicInfo
            css={[pageExpandCss, { marginBottom: 20 }]}
            recruitDetail={recruitDetail}
          />

          <div css={recruitStatsCss}>
            <div css={iconButtonsLayerCss}>
              <div css={bookmarkButtonLayerCss}>
                <Recruit.IconButton
                  iconName={scraped ? 'bookmark' : 'bookmark.outline'}
                  iconColor={palettes.primary.default}
                  label="스크랩"
                  theme={recruitTheme}
                />
                <strong>{scrapCount}</strong>
              </div>

              <div>
                <Recruit.IconButton
                  iconColor={palettes.primary.default}
                  iconName="share"
                  label="URL 복사"
                  theme={recruitTheme}
                />
              </div>
            </div>

            <div css={commentIconLayerCss}>
              <Recruit.Icon
                iconName="chat.rect"
                label="댓글"
                color={palettes.secondary.default}
              />
              {/* TODO: commentCount */}
              <strong>{1}</strong>
            </div>
          </div>
        </div>

        <div css={[buttonsLayerCss, { marginBottom: 60 }]}>
          <Recruit.ContactLink
            href={contactURI}
            css={contactButtonCss}
            theme={recruitTheme}
          />
          <Recruit.ApplyLink
            recruitId={recruitId}
            css={dynamicButtonCss}
            theme={recruitTheme}
          />
          {/*<Recruit.MyApplicationLink*/}
          {/*  css={dynamicButtonCss}*/}
          {/*  recruitId={recruitId}*/}
          {/*/>*/}
          {/*<Recruit.ApplicantsLink css={dynamicButtonCss} recruitId={recruitId} />*/}
          {/* 유저에 따라 달라짐 */}
        </div>

        <Recruit.Tabs.Root
          css={{ marginBottom: 50 }}
          theme={recruitTheme}
          descriptionText={getDescriptionTabText(category)}
        >
          <Recruit.Tabs.DescriptionContent html={content} />

          <Recruit.Tabs.ParticipantsContent recruitId={recruitId} />
        </Recruit.Tabs.Root>

        <div
          css={[
            pageExpandCss,
            {
              marginBottom: 44,
              height: 20,
              backgroundColor: palettes.background.grey,
            },
          ]}
        />

        <RecruitCommentsLayer
          recruitId={recruitId}
          css={{ marginBottom: 40 }}
        />

        <RecruitCommentFormLayer recruitId={recruitId} />
      </RecruitDetailLayout>
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

const headerCss = css(flex('flex-start', '', 'column'));
const titleLayerCss = css(
  { width: '100%' },
  flex('center', 'space-between', 'row', 12)
);
const recruitStatsCss = css(
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

const buttonsLayerCss = css(flex('center', '', 'row', 12));

const contactButtonCss = css({ width: '33%', minWidth: 120 });
const dynamicButtonCss = css({ width: '66%' });

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
    return {
      notFound: true,
    };
  }

  const dehydrate = prefetch({
    queryKey: queryKeys.recruit.detail(recruitId),
    queryFn: () => getRecruitDetail(recruitId),
  });

  const { dehydratedState } = await dehydrate();

  return {
    props: {
      recruitId,
      dehydratedState,
    },
  };
};
