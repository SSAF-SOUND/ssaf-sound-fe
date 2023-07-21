import type { RecruitMeta } from './index';

type RecruitPeriodInfoProps = Pick<RecruitMeta, 'recruitStart' | 'recruitEnd'>;

const RecruitPeriodInfo = (props: RecruitPeriodInfoProps) => {
  const { recruitStart, recruitEnd } = props;
  return (
    <>
      <span>{recruitStart.replaceAll('-', '/')}</span>
      <span> ~ </span>
      <span data-theme="recruit">{recruitEnd.replaceAll('-', '/')}</span>
    </>
  );
};

export default RecruitPeriodInfo;
