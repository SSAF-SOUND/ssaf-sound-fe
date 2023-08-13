import type {
  CommentDetail,
  CommentDetailWithoutReplies,
} from '~/services/comment';

import { css } from '@emotion/react';

import CommentContent from '~/components/ArticleComment/CommentContent';
import LikeLayer from '~/components/ArticleComment/LikeLayer';
import MoreButton from '~/components/ArticleComment/MoreButton';
import ReplyButton from '~/components/ArticleComment/ReplyButton';
import { Icon, Separator } from '~/components/Common';
import Name from '~/components/Name';
import { useMyInfo } from '~/services/member';
import { populateDefaultUserInfo } from '~/services/member/utils/popoulateDefaultUserInfo';
import { flex, fontCss, palettes } from '~/styles/utils';
import { formatDateTime } from '~/utils';

interface ArticleCommentProps {
  comment: CommentDetail | CommentDetailWithoutReplies;
  leaf?: boolean;
}

const ArticleComment = (props: ArticleCommentProps) => {
  const { comment, leaf = false } = props;
  const { data: myInfo } = useMyInfo();
  const {
    author,
    anonymity,
    mine,
    liked,
    likeCount,
    content,
    createdAt,
    replies,
    modified,
  } = comment;

  const isSignedIn = !!myInfo;

  const userInfo = populateDefaultUserInfo(author);

  const { date, time } = formatDateTime(createdAt);

  const hasReplies = replies && replies.length > 0;

  const showReplyButton = isSignedIn && !leaf;

  return (
    <div css={selfCss}>
      <div css={[commentLayerCss, leaf && leafCss]}>
        <header css={headerCss}>
          {/* eslint-disable-next-line */}
          {/* @ts-ignore */}
          <Name userInfo={userInfo} size="sm" />

          <div css={buttonLayerCss}>
            {showReplyButton && <ReplyButton />}
            <LikeLayer
              liked={liked}
              likeCount={likeCount}
              onClickLikeButton={() => {}}
            />
            {isSignedIn && <MoreButton />}
          </div>
        </header>

        <div css={{ marginBottom: 4 }}>
          <CommentContent content={content} />
          {modified && <span css={modifiedCss}>(수정됨)</span>}
        </div>

        <div css={dateTimeCss}>
          <span>{date}</span>
          <Separator
            orientation="vertical"
            backgroundColor={palettes.font.blueGrey}
            css={{ margin: '0 8px' }}
            height={12}
          />
          <span>{time}</span>
        </div>
      </div>

      {hasReplies && (
        <div css={replyLayerCss}>
          {replies.map((reply) => (
            <div key={reply.commentId} css={replyCss}>
              <Icon name="reply" size={24} />
              <ArticleComment leaf comment={reply} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleComment;

const commentLayerPaddingX = 10;

const selfCss = css({ width: '100%' });

const commentLayerCss = css({
  width: '100%',
  padding: `8px ${commentLayerPaddingX}px`,
  borderRadius: 12,
});

const leafCss = css({
  backgroundColor: palettes.background.grey,
});

const headerCss = css(flex('center', 'space-between', 'row', 20));

const buttonLayerCss = css(flex('center', '', 'row', 4));

const dateTimeCss = css(
  { color: palettes.font.blueGrey },
  fontCss.style.R12,
  flex('center', '', 'row')
);

const replyLayerCss = css({ marginTop: 6 }, flex('', '', 'column', 6));

const replyCss = css(
  {
    width: '100%',
    paddingLeft: commentLayerPaddingX,
  },
  flex('flex-start', '', 'row', 6)
);

const modifiedCss = css({ color: palettes.primary.default }, fontCss.style.R14);
