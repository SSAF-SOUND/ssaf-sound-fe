import type {
  CommentDetail,
  CommentDetailWithoutReplies,
} from '~/services/comment';

import { css } from '@emotion/react';

import CommentContent from '~/components/ArticleComment/CommentContent';
import LikeLayer from '~/components/ArticleComment/LikeLayer';
import MoreButton from '~/components/ArticleComment/MoreButton';
import ReplyButton from '~/components/ArticleComment/ReplyButton';
import { Separator } from '~/components/Common';
import Name from '~/components/Name';
import { useMyInfo } from '~/services/member';
import { populateDefaultUserInfo } from '~/services/member/utils/popoulateDefaultUserInfo';
import { flex, fontCss, palettes } from '~/styles/utils';
import { formatDateTime } from '~/utils';

interface ArticleCommentProps {
  comment: CommentDetail | CommentDetailWithoutReplies;
}

const ArticleComment = (props: ArticleCommentProps) => {
  const { comment } = props;
  const { data: myInfo } = useMyInfo();
  const { author, anonymity, mine, liked, likeCount, content, createdAt } =
    comment;

  const isSignedIn = !!myInfo;

  const userInfo = populateDefaultUserInfo(author);

  const { date, time } = formatDateTime(createdAt);

  return (
    <div css={selfCss}>
      <header css={headerCss}>
        {/* eslint-disable-next-line */}
        {/* @ts-ignore */}
        <Name userInfo={userInfo} size="sm" />

        <div css={buttonLayerCss}>
          {isSignedIn && <ReplyButton />}
          <LikeLayer
            liked={liked}
            likeCount={likeCount}
            onClickLikeButton={() => {}}
          />
          {isSignedIn && <MoreButton />}
        </div>
      </header>

      <CommentContent css={{ marginBottom: 4 }} content={content} />

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
  );
};

export default ArticleComment;

const selfCss = css({
  padding: '6px 20px',
  borderRadius: 12,
});

const headerCss = css(flex('center', 'space-between', 'row', 20));

const buttonLayerCss = css(flex('center', '', 'row', 4));

const dateTimeCss = css(
  { color: palettes.font.blueGrey },
  fontCss.style.R12,
  flex('center', '', 'row')
);
