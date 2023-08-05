import type { ArticleDetail } from '~/services/article';

import { css } from '@emotion/react';
import dayjs from 'dayjs';

import { useArticleMenuModal } from '~/components/Article/utils';
import { Icon, IconButton, Separator } from '~/components/Common';
import Name from '~/components/Name';
import { useMyInfo } from '~/services/member';
import { flex, fontCss } from '~/styles/utils';

const formatCreatedAt = (dateString: string) => {
  const dayjsInstance = dayjs(dateString);
  const formattedDate = dayjsInstance.format('MM-DD');
  const formattedTime = dayjsInstance.format('hh:mm');

  return {
    date: formattedDate,
    time: formattedTime,
  };
};

interface ArticleHeaderProps {
  className?: string;
  articleDetail: ArticleDetail;
}

const ArticleHeader = (props: ArticleHeaderProps) => {
  const { articleDetail, className } = props;
  const { data: myInfo } = useMyInfo();
  const { openArticleMenuModal } = useArticleMenuModal({
    articleDetail,
  });

  const isSignedIn = !!myInfo;
  const { author, createdAt } = articleDetail;
  const { date, time } = formatCreatedAt(createdAt);

  return (
    <header css={selfCss} className={className}>
      <div css={metaCss}>
        {/* FIXME: userInfo type */}
        {/* TODO: anonymous에 따라 익명으로 렌더링 */}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Name userInfo={author} size="md" />
        <time dateTime={createdAt} css={timeCss}>
          <span>{date}</span>
          <Separator
            orientation="vertical"
            css={{ margin: '0 8px' }}
            height={16}
          />
          <span>{time}</span>
        </time>
      </div>

      {isSignedIn && (
        <IconButton size={24} onClick={openArticleMenuModal}>
          <Icon name="more" size={24} />
        </IconButton>
      )}
    </header>
  );
};

export default ArticleHeader;

const selfCss = css(flex('center', 'space-between', 'row'));
const metaCss = css(flex('center', '', 'row', 10));
const timeCss = css(fontCss.style.R12, flex('center', '', 'row'));
