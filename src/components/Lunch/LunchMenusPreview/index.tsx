export interface LunchMenusPreviewProps {
  className?: string;
}

export const LunchMenusPreview = (props: LunchMenusPreviewProps) => {
  const { className } = props;
  return <div className={className}>LunchMenusPreview</div>;
};
