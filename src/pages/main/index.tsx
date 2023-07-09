import type { RecruitFormValues } from '~/components/RecruitForm/utils';

import deepmerge from 'deepmerge';

import RecruitForm from '~/components/RecruitForm';

interface MainPageProps {}

const MainPage = (props: MainPageProps) => {
  return (
    <div>
      <RecruitForm
        options={{
          barTitle: '리크루팅 등록하기',
          submitButtonText: '완료',
        }}
        defaultValues={{
          participants: {
            project: [],
            study: [{ part: '', count: 1 }],
          },
          contact: '',
          content: '',
          endDate: '',
          skills: {},
          title: '',
          category: '',
          questionToApplicants: '',
        }}
      />
    </div>
  );
};

const defaultRecruitFormValues: RecruitFormValues = {
  category: '프로젝트',
  participants: {
    project: [
      {
        part: '',
        count: 1,
      },
    ],
    study: [
      {
        part: '스터디',
        count: 1,
      },
    ],
  },
  endDate: '',
  skills: {},
  title: '',
  content: '',
  questionToApplicants: '',
  contact: '',
};
export default MainPage;
