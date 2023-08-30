import { RecruitsPreviewRecruitList } from '~/components/RecruitsPreview/RecruitsPreviewRecruitList';
import { recruitPreviewMarginForExpandCssVar } from '~/components/RecruitsPreview/utils';
import TitleBar from '~/components/TitleBar';
import { SkillName } from '~/services/recruit';
import { routes } from '~/utils';

interface RecruitsPreviewProps {
  className?: string;
  marginForExpand?: string;
}

const createMockRecruitSummary = (id: number) => ({
  title: '리쿠르팅'.repeat(10),
  recruitEnd: '2023-09-11',
  finishedRecruit: false,
  participants: [],
  recruitId: id,
  skills: [
    {
      skillId: 1,
      name: SkillName.ANDROID,
    },
    {
      skillId: 2,
      name: SkillName.DJANGO,
    },
    {
      skillId: 3,
      name: SkillName.JAVA,
    },
    {
      skillId: 4,
      name: SkillName.FLUTTER,
    },
  ],
});

const mockRecruitSummaries = Array(20)
  .fill(undefined)
  .map((_, index) => createMockRecruitSummary(index));

const RecruitsPreview = (props: RecruitsPreviewProps) => {
  const { className, marginForExpand = '0px' } = props;
  const maxViewCount = 10;
  const latestRecruits = mockRecruitSummaries.slice(0, maxViewCount);

  const style = {
    [recruitPreviewMarginForExpandCssVar.varName]: marginForExpand,
  };

  return (
    <div className={className} style={style}>
      <TitleBar.Preview
        title="리쿠르팅"
        moreLinkRoute={routes.recruit.self()}
        css={{ marginBottom: 16 }}
      />

      <RecruitsPreviewRecruitList recruits={latestRecruits} />
    </div>
  );
};

export default RecruitsPreview;
