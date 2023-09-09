import type { ArticleDetail } from '~/services/article';

import { css } from '@emotion/react';

import { ArticleIconButton } from '~/components/Article/ArticleIconButton';
import { useArticleMenuModal } from '~/components/Article/utils';
import { Icon, IconButton, Separator } from '~/components/Common';
import Name from '~/components/Name';
import { useMyInfo } from '~/services/member';
import { populateDefaultUserInfo } from '~/services/member/utils/popoulateDefaultUserInfo';
import { flex, fontCss } from '~/styles/utils';
import { formatDateTime } from '~/utils';

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
  const { author, createdAt, anonymity } = articleDetail;
  const { date, time } = formatDateTime(createdAt);

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
            onClick={openArticleMenuModal}
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
