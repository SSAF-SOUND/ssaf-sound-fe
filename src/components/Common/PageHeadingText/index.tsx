import { VisuallyHidden } from '~/components/Common/VisuallyHidden';

interface PageHeadingTextProps {
  text: string;
}

export const PageHeadingText = (props: PageHeadingTextProps) => {
  const { text } = props;
  return (
    <VisuallyHidden asChild>
      <h1>{text}</h1>
    </VisuallyHidden>
  );
};
