import { css } from '@emotion/react';

import { fontCss } from '~/styles/utils';

interface CommentContentProps {
  content: string;
  className?: string;
}

const CommentContent = (props: CommentContentProps) => {
  const { content, ...restProps } = props;

  return (
    <div css={selfCss} {...restProps}>
      {content.split('\n').map((p, index) => {
        return <CommentParagraph key={index} paragraph={p} />;
      })}
    </div>
  );
};

export default CommentContent;
const selfCss = css(fontCss.style.R14);

interface CommentParagraphProps {
  paragraph: string;
}
const CommentParagraph = (props: CommentParagraphProps) => {
  const { paragraph } = props;
  return <p css={commentParagraphSelfCss}>{paragraph}</p>;
};

const commentParagraphSelfCss = css({ minHeight: 24 }, fontCss.style.R14);
