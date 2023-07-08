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
      />
    </div>
  );
};

export default MainPage;
