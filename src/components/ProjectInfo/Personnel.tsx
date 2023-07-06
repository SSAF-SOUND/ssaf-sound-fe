import type { RecruitType } from '~/services/recruit';

interface PersonnelProps {
  type: RecruitType;
  max: number;
  recruitedNumber: number;
}

const Personnel = (props: PersonnelProps) => {
  const { max = 6, type = '프론트엔드', recruitedNumber = 2 } = props;
  return (
    <span>
      {type} <span data-theme="highLight">{recruitedNumber}</span>/
      <span>{max}명</span>
    </span>
  );
};

export default Personnel;
