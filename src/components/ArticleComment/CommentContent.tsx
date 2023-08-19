import { css } from '@emotion/react';

import { fontCss, palettes } from '~/styles/utils';

interface CommentContentProps {
  content: string;
  modified: boolean;
  className?: string;
}

const CommentContent = (props: CommentContentProps) => {
  const { content, modified, className } = props;

  return (
    <div className={className}>
      <div css={selfCss}>
        {content.split('\n').map((p, index) => {
          return <CommentParagraph key={index} paragraph={p} />;
        })}
      </div>
      {modified && <span css={modifiedCss}>(수정됨)</span>}
    </div>
  );
};

export default CommentContent;
const selfCss = css(fontCss.style.R14);
const modifiedCss = css({ color: palettes.primary.default }, fontCss.style.R14);

interface CommentParagraphProps {
  paragraph: string;
}
const CommentParagraph = (props: CommentParagraphProps) => {
  const { paragraph } = props;
  return <p css={commentParagraphSelfCss}>{paragraph}</p>;
};

const commentParagraphSelfCss = css({ minHeight: 24 }, fontCss.style.R14);
