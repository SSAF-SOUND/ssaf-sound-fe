import type { ArticleDetail } from '~/services/article';
import type { UseCommonBottomMenuModalParams } from '~/services/common';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { ArticleIconButton } from '~/components/Article/ArticleIconButton';
import { Separator } from '~/components/Common/Separator';
import { useModal } from '~/components/GlobalModal';
import Name from '~/components/Name';
import { useRemoveArticle } from '~/services/article/hooks';
import { useCommonBottomMenuModal } from '~/services/common';
import { useMyInfo } from '~/services/member';
import { populateDefaultUserInfo } from '~/services/member/utils/popoulateDefaultUserInfo';
import { ReportDomain, useReport } from '~/services/report';
import { flex, fontCss } from '~/styles/utils';
import { customToast, formatDateTime, routes } from '~/utils';

interface ArticleHeaderProps {
  className?: string;
  articleDetail: ArticleDetail;
}

const ArticleHeader = (props: ArticleHeaderProps) => {
  const router = useRouter();
  const { articleDetail, className } = props;
  const { data: myInfo } = useMyInfo();

  const isSignedIn = !!myInfo;
  const {
    author,
    createdAt,
    anonymity,
    mine,
    postId: articleId,
    boardId: categoryId,
  } = articleDetail;
  const { date, time } = formatDateTime(createdAt);
  const { mutateAsync: removeArticle } = useRemoveArticle(articleId);
  const { mutateAsync: reportArticle } = useReport();
  const { closeModal } = useModal();

  const onClickEdit = () => {
    router.push(routes.article.edit(articleId));
    closeModal();
  };
  const onClickRemove = async () => {
    try {
      await customToast.promise(removeArticle(), {
        loading: '게시글을 삭제중입니다.',
        success: '게시글을 성공적으로 삭제하였습니다.',
      });
      closeModal();
      await router.replace(routes.article.category({ categoryId }));
    } catch (err) {}
  };
  const onClickReport: UseCommonBottomMenuModalParams['onClickReport'] = ({
    domain,
    reportReasonId,
  }) => {
    return customToast.promise(
      reportArticle({
        domain,
        reasonId: reportReasonId,
        sourceId: articleId,
      }),
      {
        loading: '신고 요청을 처리중입니다.',
        success: '해당 게시글을 성공적으로 신고하였습니다.',
      }
    );
  };

  const { openCommonBottomMenuModal } = useCommonBottomMenuModal({
    mine,
    reportDomain: ReportDomain.ARTICLE,
    onClickEdit,
    onClickRemove,
    onClickReport,
    options: {
      modalTitle: '게시글 메뉴',
      removeAlertDescription: '게시글을 삭제하시겠습니까?',
    },
  });

  return (
    <header css={selfCss} className={className}>
      <div css={topDivisionCss}>
        <Name
          userInfo={populateDefaultUserInfo(author)}
          size="md"
          anonymous={anonymity}
        />
        {isSignedIn && (
          <ArticleIconButton
            iconName="more"
            label="더보기"
            onClick={openCommonBottomMenuModal}
          />
        )}
      </div>

      <time dateTime={createdAt} css={timeCss}>
        <span>{date}</span>
        <Separator
          orientation="vertical"
          css={{ margin: '0 8px' }}
          height={16}
        />
        <span>{time}</span>
      </time>
    </header>
  );
};

export default ArticleHeader;

const selfCss = css(flex('', '', 'column', 6));

const topDivisionCss = css(
  { minHeight: 32 },
  flex('center', 'space-between', 'row', 16)
);

const timeCss = css(fontCss.style.R12, flex('center', '', 'row'));
