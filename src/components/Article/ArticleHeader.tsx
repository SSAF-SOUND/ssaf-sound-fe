import type { ArticleDetail } from '~/services/article';

import { css } from '@emotion/react';

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
      <div css={metaCss}>
        <Name
          userInfo={populateDefaultUserInfo(author)}
          size="md"
          anonymous={anonymity}
        />
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
