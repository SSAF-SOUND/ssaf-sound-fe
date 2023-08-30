export interface ArticlesPreviewProps {
  className?: string;
}

export const ArticlesPreview = (props: ArticlesPreviewProps) => {
  const { className } = props;
  return <div className={className}>ArticlesPreview</div>;
};
